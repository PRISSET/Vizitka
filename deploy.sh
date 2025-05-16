#!/bin/bash

echo "Starting project preparation for GitHub upload and Vercel deployment..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    echo "Git repository successfully initialized!"
fi

# Add all files
echo "Adding files to git..."
git add .

# Make a commit
echo "Enter commit message (or press Enter for default message):"
read commitMessage
if [ -z "$commitMessage" ]; then
    commitMessage="Update business card website"
fi
git commit -m "$commitMessage"
echo "Commit successfully created!"

# Check remote repository
remoteExists=$(git remote -v)
if [ -z "$remoteExists" ]; then
    echo "Enter GitHub repository URL (e.g.: https://github.com/username/repo.git):"
    read repoUrl
    git remote add origin "$repoUrl"
    echo "Remote repository added: $repoUrl"
fi

# Push changes to GitHub
echo "Pushing changes to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "Project successfully uploaded to GitHub!"

    echo ""
    echo "For Vercel deployment:"
    echo "1. Go to https://vercel.com/import"
    echo "2. Import your repository"
    echo "3. Project settings are usually determined automatically"
    echo "4. Click 'Deploy' to finish"
    
    echo "Would you like to open Vercel in browser? (y/n)"
    read openVercel
    if [ "$openVercel" = "y" ]; then
        if [ "$(uname)" == "Darwin" ]; then
            open "https://vercel.com/import"
        elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
            xdg-open "https://vercel.com/import"
        fi
    fi
else
    echo "An error occurred when pushing to GitHub. Please check error messages above."
fi

echo ""
echo "Process completed." 