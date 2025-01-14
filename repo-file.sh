#!/bin/bash

# Define our directory and output file
src_dir=$(pwd)
repo_name=$(basename "$src_dir")
timestamp=$(date +%Y%m%d_%H%M%S)
combined_file="${src_dir}/combined_${timestamp}.txt"

# Define our exclusion lists
excluded_dirs=("node_modules" ".next" "build" "coverage" "public" "docs" "tests" ".git")
excluded_files=(".env" "package-lock.json" "yarn.lock" "pnpm-lock.yaml" ".eslintrc.json" ".prettierrc" ".gitignore" ".prettierignore" "next.config.js" "babel.config.js" "jest.config.js" "tsconfig.json" "postcss.config.mjs" "next-env.d.ts" "components.json")
allowed_extensions=("js" "jsx" "ts" "tsx" "html" "json" "css" "scss" "sass" "md" "yml" "yaml")

# Clear our output file
: > "$combined_file"

# Function to generate the directory tree
generate_tree() {
    local dir_path=$1
    local prefix=$2
    local indent=$3

    # Print the current directory name
    echo "${prefix}${dir_path##*/}/" >> "$combined_file"

    # Increase the indent for subdirectories
    local new_indent="${indent}│   "

    # Include hidden files by checking both * and .*
    local items=("$dir_path"/* "$dir_path"/.*)
    items=("${items[@]}") # Ensure proper expansion

    # Check if the directory is empty (excluding '.' and '..')
    local visible_count=0
    for item in "${items[@]}"; do
        basename=$(basename "$item")
        if [[ "$basename" != "." && "$basename" != ".." ]]; then
            ((visible_count++))
        fi
    done

    if [ $visible_count -eq 0 ]; then
        return
    fi

    local count=${#items[@]}
    local index=0

    for item in "${items[@]}"; do
        basename=$(basename "$item")
        # Skip '.' and '..'
        if [[ "$basename" == "." || "$basename" == ".." ]]; then
            continue
        fi

        ((index++))
        local connector="├──"
        if [ $index -eq $count ]; then
            connector="└──"
        fi

        # Check if the item is in the exclusion list
        local excluded=false
        for excluded_dir in "${excluded_dirs[@]}"; do
            if [[ "$basename" == "$excluded_dir" ]]; then
                echo "${new_indent}${connector} ${excluded_dir}/" >> "$combined_file"
                excluded=true
                break
            fi
        done
        if [ "$excluded" = true ]; then
            continue
        fi

        # Check if the item is a directory
        if [ -d "$item" ]; then
            generate_tree "$item" "${new_indent}${connector} " "$new_indent"
        else
            # Print the file name
            echo "${new_indent}${connector} ${basename}" >> "$combined_file"
        fi
    done
}

# Start generating folder structure with clear delimiters
echo "==== CODEBASE FOLDER STRUCTURE ====" > "$combined_file"
generate_tree "$src_dir" "" ""

# Build the 'find' command
find_command=("find" "$src_dir" "-type" "f")

# Exclude directories (case-sensitive)
for dir in "${excluded_dirs[@]}"; do
  find_command+=("-not" "-path" "$src_dir/$dir/*")
done

# Exclude files
for file in "${excluded_files[@]}"; do
  find_command+=("-not" "-name" "$file")
done

find_command+=("-print0")

# Add the section header for file contents
echo -e "\n==== CODEBASE FILES WITH THEIR RESPECTIVE PATHS ====\n" >> "$combined_file"

# Search recursively in our directory for files
while IFS= read -r -d '' file; do
  filename=$(basename "$file")
  extension="${filename##*.}"
  
  # Check if the file should be processed
  if [ "$filename" == "Dockerfile" ] || [[ " ${allowed_extensions[@]} " =~ " ${extension} " ]]; then
    # Append the filename to the big file with clear delimiter
    echo -e "\n\n### ${file#$src_dir/} ###\n" >> "$combined_file"
    # Append the file contents to the big file
    cat "$file" >> "$combined_file"
  fi
done < <("${find_command[@]}")

# Output a completed message
echo "Done. Output in: $combined_file"