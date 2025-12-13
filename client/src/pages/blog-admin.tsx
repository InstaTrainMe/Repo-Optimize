import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, Moon, Sun, LogOut, Users, Shield, UserPlus } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { BlogPost, User } from "@shared/schema";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="button-theme-toggle"
      className="bg-muted"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}

const categories = [
  "Motivation",
  "Technology",
  "Training",
  "Nutrition",
  "Wellness",
  "Tips",
  "Success Stories"
];

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  imageUrl: string;
  published: boolean;
}

const emptyForm: BlogFormData = {
  title: "",
  excerpt: "",
  content: "",
  category: "Training",
  author: "",
  readTime: "5 min read",
  imageUrl: "",
  published: false
};

export default function BlogAdmin() {
  const { toast } = useToast();
  const { user, isLoading: authLoading, isAuthenticated, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(emptyForm);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout");
      queryClient.clear();
      window.location.href = "/";
    } catch (error) {
      toast({ title: "Error", description: "Failed to logout", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [authLoading, isAuthenticated]);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    enabled: isAuthenticated && isAdmin,
  });

  const { data: allUsers = [] } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated && isAdmin && showUserManagement,
  });

  const createMutation = useMutation({
    mutationFn: (data: BlogFormData) => apiRequest("POST", "/api/blog", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Success", description: "Blog post created successfully" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create blog post", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogFormData> }) => 
      apiRequest("PATCH", `/api/blog/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Success", description: "Blog post updated successfully" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update blog post", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Success", description: "Blog post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" });
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) => 
      apiRequest("PATCH", `/api/blog/${id}`, { published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Success", description: "Publish status updated" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({ title: "Unauthorized", description: "Please log in again.", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Error", description: "Failed to update publish status", variant: "destructive" });
    }
  });

  const updateAdminMutation = useMutation({
    mutationFn: ({ id, isAdmin }: { id: string; isAdmin: boolean }) =>
      apiRequest("PATCH", `/api/admin/users/${id}`, { isAdmin }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Success", description: "User admin status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user", variant: "destructive" });
    }
  });

  const createUserMutation = useMutation({
    mutationFn: (data: { email: string; firstName: string; lastName: string; isAdmin: boolean }) =>
      apiRequest("POST", "/api/admin/users", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Success", description: "User created successfully" });
      setNewUserEmail("");
      setNewUserFirstName("");
      setNewUserLastName("");
      setNewUserIsAdmin(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create user. Email may already exist.", variant: "destructive" });
    }
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              You need admin privileges to access this page. Please contact an administrator.
            </p>
            <div className="flex gap-2 justify-center">
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const resetForm = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      readTime: post.readTime,
      imageUrl: post.imageUrl || "",
      published: post.published
    });
    setIsEditing(true);
    setEditingId(post.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" aria-label="Go to homepage" data-testid="button-home">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Home
            </Button>
          </Link>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#667eea] to-[#764ba2]">
            Blog Admin
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUserManagement(!showUserManagement)}
              aria-label="Manage users"
              data-testid="button-users"
            >
              <Users className="w-4 h-4" />
            </Button>
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Logout" 
              data-testid="button-logout"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {showUserManagement && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Add New User
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <Input
                    placeholder="Email (required)"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    data-testid="input-new-user-email"
                  />
                  <Input
                    placeholder="First Name"
                    value={newUserFirstName}
                    onChange={(e) => setNewUserFirstName(e.target.value)}
                    data-testid="input-new-user-firstname"
                  />
                  <Input
                    placeholder="Last Name"
                    value={newUserLastName}
                    onChange={(e) => setNewUserLastName(e.target.value)}
                    data-testid="input-new-user-lastname"
                  />
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newUserIsAdmin}
                      onCheckedChange={setNewUserIsAdmin}
                      data-testid="switch-new-user-admin"
                    />
                    <Label>Make Admin</Label>
                  </div>
                </div>
                <Button
                  onClick={() => createUserMutation.mutate({
                    email: newUserEmail,
                    firstName: newUserFirstName,
                    lastName: newUserLastName,
                    isAdmin: newUserIsAdmin
                  })}
                  disabled={!newUserEmail || createUserMutation.isPending}
                  data-testid="button-create-user"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Existing users and their admin status:
              </p>
              {allUsers.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No users found.</p>
              ) : (
                <div className="space-y-2">
                  {allUsers.map((u) => (
                    <div key={u.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {u.profileImageUrl && (
                          <img src={u.profileImageUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                        )}
                        <div>
                          <p className="font-medium">{u.firstName} {u.lastName}</p>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground mr-2">
                          {u.isAdmin ? "Admin" : "User"}
                        </span>
                        <Switch
                          checked={u.isAdmin ?? false}
                          onCheckedChange={(checked) => updateAdminMutation.mutate({ id: u.id, isAdmin: checked })}
                          disabled={u.id === user?.id}
                          aria-label={`Toggle admin for ${u.email}`}
                          data-testid={`switch-admin-${u.id}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingId ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingId ? "Edit Post" : "New Post"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      required
                      data-testid="input-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Author name"
                      required
                      data-testid="input-author"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="readTime">Read Time</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="5 min read"
                      required
                      data-testid="input-read-time"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL (optional)</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      data-testid="input-image-url"
                    />
                    {formData.imageUrl && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-border">
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-full h-32 object-cover"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description for the blog listing"
                      rows={2}
                      required
                      data-testid="input-excerpt"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Full blog post content (supports **bold** and other markdown)"
                      rows={8}
                      required
                      data-testid="input-content"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      data-testid="switch-published"
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      data-testid="button-submit"
                    >
                      {editingId ? "Update Post" : "Create Post"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel">
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Posts ({posts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-muted-foreground text-center py-8">Loading posts...</p>
                ) : posts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No blog posts yet. Create your first post!</p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div 
                        key={post.id} 
                        className="p-4 rounded-lg border border-border bg-muted/30"
                        data-testid={`post-item-${post.id}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          {post.imageUrl && (
                            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea]">
                                {post.category}
                              </span>
                              {post.published ? (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 flex items-center gap-1">
                                  <Eye className="w-3 h-3" /> Published
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 flex items-center gap-1">
                                  <EyeOff className="w-3 h-3" /> Draft
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{post.excerpt}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              By {post.author} • {formatDate(post.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => togglePublishMutation.mutate({ id: post.id, published: !post.published })}
                              aria-label={post.published ? "Unpublish" : "Publish"}
                              data-testid={`button-toggle-publish-${post.id}`}
                            >
                              {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(post)}
                              aria-label="Edit post"
                              data-testid={`button-edit-${post.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteMutation.mutate(post.id)}
                              aria-label="Delete post"
                              className="text-destructive"
                              data-testid={`button-delete-${post.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
