"use client";

import React, { useState, useEffect, type ReactElement } from "react";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import {
  CATEGORY_METHODS,
  type CategoryName,
} from "@/features/codingChallenges/types";
import { ExerciseCard } from "@/features/codingChallenges/components/ExerciseCard";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Code2, BookOpen, Layers, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

// Category color mapping
const categoryColors: Record<CategoryName, { bg: string; text: string; border: string }> = {
  array: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  object: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  map: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  set: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
};

export default function ExercisesPage(): ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName | "all">("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [completedCount, setCompletedCount] = useState(0);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  
  // Debounce search query to prevent excessive re-renders
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Load completed exercises from localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem("completedExercises");
    if (completed) {
      setCompletedCount(JSON.parse(completed).length);
    }
  }, []);

  // Filter exercises based on search and filters
  const filteredExercises = EXERCISES.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exercise.category.name === selectedCategory;
    const matchesMethod = selectedMethod === "all" || exercise.category.method === selectedMethod;
    return matchesSearch && matchesCategory && matchesMethod;
  });

  // Get available methods for selected category
  const availableMethods = selectedCategory === "all" 
    ? Array.from(new Set(Object.values(CATEGORY_METHODS).flat()))
    : CATEGORY_METHODS[selectedCategory as keyof typeof CATEGORY_METHODS] || [];

  // Get methods with their categories for "all" view
  const methodsWithCategories = selectedCategory === "all"
    ? Array.from(new Set(Object.values(CATEGORY_METHODS).flat())).map(method => {
        const categories = Object.entries(CATEGORY_METHODS)
          .filter(([, methods]) => (methods as readonly string[]).includes(method as string))
          .map(([category]) => category);
        return { method, categories };
      })
    : availableMethods.map(method => ({ method, categories: [selectedCategory] }));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      data-component="ExercisesPage"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-background to-background/80"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background/0 border-b border-border/50">
        <div className="absolute inset-0 grid grid-cols-6 -skew-y-12 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-r border-primary/20 h-full" />
          ))}
        </div>
        <div className="container mx-auto py-16 relative">
          <motion.div 
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-relaxed py-1">
              Learn JavaScript Methods
            </h1>
            <p className="text-xl text-muted-foreground">
              Master JavaScript through hands-on learning. Understand and practice essential methods with interactive examples.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
          >
            <StatsCard
              icon={<Code2 className="w-5 h-5" />}
              value={EXERCISES.length}
              label="Learning Exercises"
            />
            <StatsCard
              icon={<Layers className="w-5 h-5" />}
              value={Object.keys(CATEGORY_METHODS).length}
              label="Method Types"
            />
            <StatsCard
              icon={<BookOpen className="w-5 h-5" />}
              value={Array.from(new Set(Object.values(CATEGORY_METHODS).flat())).length}
              label="Methods to Learn"
            />
            <StatsCard
              icon={<Trophy className="w-5 h-5" />}
              value={completedCount}
              label="Methods Mastered"
              highlight={true}
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        {/* Filters Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-card rounded-lg border shadow-sm p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Command 
              className="rounded-lg border"
              shouldFilter={false}
            >
              <CommandInput
                placeholder="Search exercises..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                onFocus={() => setIsCommandOpen(true)}
                onBlur={() => {
                  // Small delay to allow for item selection
                  setTimeout(() => setIsCommandOpen(false), 200);
                }}
              />
              {isCommandOpen && (
                <CommandList className="animate-in fade-in-0 zoom-in-95">
                  <CommandEmpty>No exercises found.</CommandEmpty>
                  {Object.keys(CATEGORY_METHODS).map(category => {
                    const categoryExercises = filteredExercises.filter(
                      exercise => exercise.category.name === category
                    );
                    
                    if (categoryExercises.length === 0) return null;
                    
                    return (
                      <React.Fragment key={category}>
                        <CommandGroup heading={category.charAt(0).toUpperCase() + category.slice(1)}>
                          {categoryExercises.map((exercise) => (
                            <CommandItem
                              key={exercise.slug}
                              value={exercise.title}
                              className="flex items-center gap-2 cursor-pointer"
                              onSelect={() => {
                                window.location.href = `/exercises/${exercise.slug}`;
                                setIsCommandOpen(false);
                              }}
                            >
                              <div 
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  categoryColors[exercise.category.name]?.bg || "bg-gray-100"
                                )} 
                              />
                              <span>{exercise.title}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                      </React.Fragment>
                    );
                  })}
                </CommandList>
              )}
            </Command>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value as CategoryName | "all");
                const validMethods: readonly string[] =
                  value === "all"
                    ? Array.from(
                        new Set(Object.values(CATEGORY_METHODS).flat())
                      )
                    :
                      CATEGORY_METHODS[
                        value as keyof typeof CATEGORY_METHODS
                      ] ?? [];
                if (!validMethods.includes(selectedMethod)) {
                  setSelectedMethod("all");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.keys(CATEGORY_METHODS).map(category => (
                  <SelectItem key={category} value={category}>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        categoryColors[category as CategoryName]?.bg || "bg-gray-100"
                      )} />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </div>
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
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="space-y-6">
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <h2 className="text-2xl font-semibold">
              Available Exercises ({filteredExercises.length})
            </h2>
            <div className="flex gap-2">
              {selectedCategory !== "all" && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "capitalize",
                    categoryColors[selectedCategory as CategoryName]?.bg,
                    categoryColors[selectedCategory as CategoryName]?.text
                  )}
                >
                  {selectedCategory}
                </Badge>
              )}
              {selectedMethod !== "all" && (
                <Badge variant="secondary">
                  {selectedMethod}
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Exercises Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedCategory}-${selectedMethod}-${debouncedSearch}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredExercises.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className="contents"
                >
                  {filteredExercises.map((exercise) => (
                    <motion.div
                      key={exercise.slug}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExerciseCard 
                        exercise={exercise}
                        categoryColors={categoryColors[exercise.category.name]}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">No exercises found</h3>
                        <p className="text-muted-foreground max-w-[350px] mx-auto">
                          {searchQuery ? (
                            <>No exercises match your search &quot;{searchQuery}&quot;. Try different keywords or clear your search.</>
                          ) : selectedCategory !== "all" || selectedMethod !== "all" ? (
                            <>No exercises found with the selected filters. Try adjusting your category or method selection.</>
                          ) : (
                            <>No exercises are currently available. Please check back later.</>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                          >
                            Clear search
                          </button>
                        )}
                        {(selectedCategory !== "all" || selectedMethod !== "all") && (
                          <button
                            onClick={() => {
                              setSelectedCategory("all");
                              setSelectedMethod("all");
                            }}
                            className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                          >
                            Reset filters
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
ExercisesPage.displayName = "ExercisesPage";

// Stats Card Component
function StatsCard({ icon, value, label, highlight = false }: {
  icon: React.ReactNode;
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      data-component="StatsCard"
      whileHover={{ scale: 1.05 }}
      className={cn(
        "rounded-lg p-4 text-center space-y-2 bg-card border shadow-sm",
        highlight && "bg-primary/5 border-primary/20"
      )}
    >
      <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
StatsCard.displayName = "StatsCard";
