"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { EXERCISES, CATEGORY_METHODS } from "@/features/codingChallenges/data/exercisesData";
import { ExerciseCard } from "@/features/codingChallenges/components/ExerciseCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Code2, BookOpen, Layers, Trophy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  array: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  object: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  map: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  set: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
};

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [completedCount, setCompletedCount] = useState(0);
  
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
          .filter(([_, methods]) => (methods as readonly string[]).includes(method as string))
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
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              JavaScript Coding Challenges
            </h1>
            <p className="text-xl text-muted-foreground">
              Master JavaScript through interactive coding exercises. Practice, learn, and improve your skills with hands-on challenges.
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
              label="Total Exercises"
            />
            <StatsCard
              icon={<Layers className="w-5 h-5" />}
              value={Object.keys(CATEGORY_METHODS).length}
              label="Categories"
            />
            <StatsCard
              icon={<BookOpen className="w-5 h-5" />}
              value={Array.from(new Set(Object.values(CATEGORY_METHODS).flat())).length}
              label="Methods"
            />
            <StatsCard
              icon={<Trophy className="w-5 h-5" />}
              value={completedCount}
              label="Completed"
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
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        categoryColors[category]?.bg || "bg-gray-100"
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
                    categoryColors[selectedCategory]?.bg,
                    categoryColors[selectedCategory]?.text
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
                  variants={itemVariants}
                  className="col-span-full text-center py-12"
                >
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="text-4xl">🔍</div>
                    <h3 className="text-lg font-semibold">No exercises found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
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

// Stats Card Component
function StatsCard({ icon, value, label, highlight = false }: {
  icon: React.ReactNode;
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <motion.div 
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