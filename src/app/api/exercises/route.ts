import { NextResponse } from "next/server";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";

/**
 * GET /api/exercises
 * Returns a list of all available coding exercises
 */
export async function GET() {
  try {
    // Return exercises with 200 status
    return NextResponse.json(
      { 
        exercises: EXERCISES 
      },
      { 
        status: 200,
        headers: {
          // Add cache control headers - revalidate every hour since exercises are static
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    // Log error internally but don't expose details to client
    console.error("[api/exercises] Error:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch exercises" },
      { status: 500 }
    );
  }
} 