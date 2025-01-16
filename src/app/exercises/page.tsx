"use client";

import { useState, ChangeEvent } from "react";
import { EXERCISES, CATEGORY_METHODS, CategoryName, MethodName } from "@/features/codingChallenges/data/exercisesData";
import { ExerciseCard } from "@/features/codingChallenges/components/ExerciseCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");

  // Filter exercises based on search and filters
  const filteredExercises = EXERCISES.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exercise.category.name === selectedCategory;
    const matchesMethod = selectedMethod === "all" || exercise.category.method === selectedMethod;
    return matchesSearch && matchesCategory && matchesMethod;
  });

  // Get available methods for selected category and ensure uniqueness
  const availableMethods = selectedCategory === "all" 
    ? Array.from(new Set(Object.values(CATEGORY_METHODS).flat()))
    : CATEGORY_METHODS[selectedCategory as keyof typeof CATEGORY_METHODS] || [];

  // Get unique methods with their categories for "all" view
  const methodsWithCategories = selectedCategory === "all"
    ? Array.from(new Set(Object.values(CATEGORY_METHODS).flat())).map(method => {
        const categories = Object.entries(CATEGORY_METHODS)
          .filter(([_, methods]) => (methods as readonly string[]).includes(method as string))
          .map(([category]) => category);
        return { method, categories };
      })
    : availableMethods.map(method => ({ method, categories: [selectedCategory] }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 space-y-8"
    >
      {/* Header Section */}
      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            JavaScript Coding Challenges
          </h1>
          <p className="text-muted-foreground text-lg">
            Master JavaScript array methods through interactive coding exercises. Practice, learn, and improve your skills.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{EXERCISES.length}</div>
            <div className="text-sm text-muted-foreground">Total Exercises</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{Object.keys(CATEGORY_METHODS).length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {Array.from(new Set(Object.values(CATEGORY_METHODS).flat())).length}
            </div>
            <div className="text-sm text-muted-foreground">Methods</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search exercises..."
            className="pl-10"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.keys(CATEGORY_METHODS).map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            {methodsWithCategories.map(({ method, categories }) => (
              <SelectItem key={method} value={method}>
                <div className="flex items-center justify-between w-full">
                  <span>{method}</span>
                  {selectedCategory === "all" && categories.length > 1 && (
                    <span className="text-xs text-muted-foreground">
                      ({categories.join(", ")})
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Available Exercises ({filteredExercises.length})
          </h2>
          <div className="flex gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="capitalize">
                {selectedCategory}
              </Badge>
            )}
            {selectedMethod !== "all" && (
              <Badge variant="secondary">
                {selectedMethod}
              </Badge>
            )}
          </div>
        </div>

        {/* Exercises Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <motion.div
                key={exercise.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No exercises found matching your criteria.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
} 