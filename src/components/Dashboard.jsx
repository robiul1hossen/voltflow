"use client";
import { useQuery } from "@tanstack/react-query";
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
  Building2,
  Globe,
  Mail,
  NotebookText,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
    },
  });
  console.log(posts);
  const handleCreate = () => {};
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
          <DialogTrigger>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#16191f] text-slate-200 border-slate-800 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Create New Contact
              </DialogTitle>
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
                    className="border-slate-800 grid grid-cols-2 gap-10">
                    {/* Post Content */}
                    <TableCell className=" align-top">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-white">
                          {post?.title}
                        </span>

                        <span className="text-xs text-slate-500 flex items-start gap-1 max-w-125 wrap-break-word">
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
