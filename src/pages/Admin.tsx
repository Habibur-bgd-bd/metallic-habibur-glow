import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Plus, Save, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type Video = Tables<"videos">;

const emptyVideo = {
  title: "",
  thumbnail: "",
  youtube_url: "",
  channel: "Habibur.bgd",
  views: "0 views",
  date: "",
  duration: "0:00",
  category: "Full Videos",
};

const Admin = () => {
  const queryClient = useQueryClient();
  const [editingRows, setEditingRows] = useState<Record<string, Partial<Video>>>({});
  const [newVideo, setNewVideo] = useState(emptyVideo);
  const [showAdd, setShowAdd] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["admin-videos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const fetchYouTubeMetadata = async (url: string) => {
    if (!url.trim()) return;
    setIsFetching(true);
    try {
      const { data, error } = await supabase.functions.invoke("youtube-metadata", {
        body: { url },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setNewVideo((prev) => ({
        ...prev,
        title: data.title || prev.title,
        thumbnail: data.thumbnail || prev.thumbnail,
        duration: data.duration || prev.duration,
        views: data.views || prev.views,
        channel: data.channel || prev.channel,
      }));
      toast.success("YouTube metadata fetched!");
    } catch (e: any) {
      toast.error("Failed to fetch metadata: " + (e.message || "Unknown error"));
    } finally {
      setIsFetching(false);
    }
  };

  const addMutation = useMutation({
    mutationFn: async (video: typeof newVideo) => {
      const { error } = await supabase.from("videos").insert(video);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      setNewVideo(emptyVideo);
      setShowAdd(false);
      toast.success("Video added!");
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Video> }) => {
      const { error } = await supabase.from("videos").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast.success("Video updated!");
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("videos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast.success("Video deleted!");
    },
    onError: (e) => toast.error(e.message),
  });

  const handleEdit = (id: string, field: string, value: string) => {
    setEditingRows((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = (id: string) => {
    const updates = editingRows[id];
    if (updates && Object.keys(updates).length > 0) {
      updateMutation.mutate({ id, updates });
      setEditingRows((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const tableFields: { key: keyof Pick<Video, 'title' | 'thumbnail' | 'youtube_url' | 'views' | 'date' | 'duration' | 'category'>; label: string; wide?: boolean }[] = [
    { key: "title", label: "Title", wide: true },
    { key: "thumbnail", label: "Thumbnail URL", wide: true },
    { key: "youtube_url", label: "YouTube URL", wide: true },
    { key: "views", label: "Views" },
    { key: "date", label: "Date" },
    { key: "duration", label: "Duration" },
    { key: "category", label: "Category" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 metallic-sheen border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="font-brand text-2xl text-gradient-social">Video Manager</h1>
          </div>
          <Button onClick={() => setShowAdd(true)} className="gap-2">
            <Plus size={16} /> Add Video
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showAdd && (
          <div className="metallic-card rounded-lg p-6 mb-8 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Add New Video</h2>

            {/* YouTube URL with fetch button */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">YouTube URL</label>
              <div className="flex gap-2">
                <Input
                  value={newVideo.youtube_url}
                  onChange={(e) => setNewVideo((prev) => ({ ...prev, youtube_url: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1"
                />
                <Button
                  onClick={() => fetchYouTubeMetadata(newVideo.youtube_url)}
                  disabled={!newVideo.youtube_url.trim() || isFetching}
                  variant="secondary"
                >
                  {isFetching ? <Loader2 size={16} className="animate-spin mr-1" /> : null}
                  {isFetching ? "Fetching..." : "Fetch Info"}
                </Button>
              </div>
            </div>

            {/* Auto-fetched fields (read-only display) */}
            {newVideo.title && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-md border border-border/50 bg-muted/30">
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1 block">Title (auto-fetched)</label>
                  <Input value={newVideo.title} readOnly className="bg-transparent opacity-80" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1 block">Thumbnail (auto-fetched)</label>
                  <Input value={newVideo.thumbnail} readOnly className="bg-transparent opacity-80" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Duration (auto-fetched)</label>
                  <Input value={newVideo.duration} readOnly className="bg-transparent opacity-80" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Views (auto-fetched)</label>
                  <Input value={newVideo.views} readOnly className="bg-transparent opacity-80" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Channel (auto-fetched)</label>
                  <Input value={newVideo.channel} readOnly className="bg-transparent opacity-80" />
                </div>
              </div>
            )}

            {/* Manual fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Date</label>
                <Input
                  value={newVideo.date}
                  onChange={(e) => setNewVideo((prev) => ({ ...prev, date: e.target.value }))}
                  placeholder="e.g. 2 days ago"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Category</label>
                <select
                  value={newVideo.category}
                  onChange={(e) => setNewVideo((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
                >
                  <option value="Full Videos">Full Videos</option>
                  <option value="Shorts Videos">Shorts Videos</option>
                  <option value="Travel Videos">Travel Videos</option>
                  <option value="Vlog Videos">Vlog Videos</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => addMutation.mutate(newVideo)} disabled={!newVideo.title || !newVideo.thumbnail}>
                <Plus size={16} className="mr-1" /> Add
              </Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setNewVideo(emptyVideo); }}>Cancel</Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <p className="text-center text-muted-foreground py-20">Loading videos...</p>
        ) : videos && videos.length > 0 ? (
          <div className="metallic-card rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">#</TableHead>
                  {tableFields.map((f) => (
                    <TableHead key={f.key}>{f.label}</TableHead>
                  ))}
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video, i) => (
                  <TableRow key={video.id}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    {tableFields.map((f) => (
                      <TableCell key={f.key}>
                        <Input
                          className="bg-transparent border-border/30 text-sm"
                          value={editingRows[video.id]?.[f.key as keyof Video] ?? (video as any)[f.key] ?? ""}
                          onChange={(e) => handleEdit(video.id, f.key, e.target.value)}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex gap-1">
                        {editingRows[video.id] && (
                          <Button size="icon" variant="ghost" onClick={() => handleSave(video.id)}>
                            <Save size={16} className="text-primary" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(video.id)}>
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No videos yet. Add your first video!</p>
            <Button onClick={() => setShowAdd(true)} className="gap-2">
              <Plus size={16} /> Add Video
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
