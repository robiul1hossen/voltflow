"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Globe,
  NotebookText,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
    },
  });

  const queryClient = useQueryClient();
  // Create post
  const createMutation = useMutation({
    mutationFn: async (newPost) => {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost,
      );
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) => [
        data,
        ...oldPosts,
      ]);
    },
  });
  const handleCreate = async (data) => {
    createMutation.mutate(data);
  };

  // delete post
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["posts"], (old) => {
        return old?.filter((u) => u.id !== id);
      });
      toast.success("Post deleted successfully");
    },
    onError: () => toast.error("Failed to delete Post"),
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Contact Directory
          </h1>
          <p className="text-slate-400">
            Manage your professional network and team members.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#16191f] text-slate-200 border-slate-800 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Create New Contact
              </DialogTitle>
              <form
                onSubmit={handleSubmit(handleCreate)}
                className="space-y-4 pt-4">
                <div className=" gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      name="title"
                      placeholder="Title Here"
                      {...register("title", { required: true })}
                      className="bg-[#0f1115] border-slate-800"
                    />
                    {errors.title && (
                      <span className="text-xs text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Post</label>
                    <Input
                      name="body"
                      type="text"
                      placeholder="Post here..."
                      {...register("body", { required: true })}
                      className="bg-[#0f1115] border-slate-800"
                    />
                    {errors.body && (
                      <span className="text-xs text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700">
                    {createMutation.isPending
                      ? "Creating..."
                      : "Create Contact"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="border-slate-800 bg-[#16191f]">
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#0f1115] border-slate-800 text-slate-200"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border border-slate-800">
            <Table className="table-fixed w-full">
              <TableBody>
                {posts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="group border-slate-800 hover:bg-slate-800/30 transition-colors">
                    {/* Post Content */}
                    <TableCell className="align-top hover:bg-transparent">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-white group-hover:text-blue-400 transition-colors">
                          {post?.title}
                        </span>

                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <NotebookText className="h-3 w-3 text-blue-500/70 mt-0.5 " />
                          {post?.body.slice(0, 100)}...
                        </span>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className=" text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10">
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(post.id)}
                          disabled={deleteMutation.isPending}
                          className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
