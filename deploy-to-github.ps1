Write-Host "Starting project preparation for GitHub upload and Vercel deployment..." -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git repository successfully initialized!" -ForegroundColor Green
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Make a commit
$commitMessage = Read-Host "Enter commit message (or press Enter for default message)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update business card website"
}
git commit -m $commitMessage
Write-Host "Commit successfully created!" -ForegroundColor Green

# Check remote repository
$remoteExists = git remote -v
if ([string]::IsNullOrWhiteSpace($remoteExists)) {
    $repoUrl = Read-Host "Enter GitHub repository URL (e.g.: https://github.com/username/repo.git)"
    git remote add origin $repoUrl
    Write-Host "Remote repository added: $repoUrl" -ForegroundColor Green
}

# Push changes to GitHub
Write-Host "Pushing changes to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Project successfully uploaded to GitHub!" -ForegroundColor Green

    Write-Host "`nFor Vercel deployment:" -ForegroundColor Cyan
    Write-Host "1. Go to https://vercel.com/import" -ForegroundColor White
    Write-Host "2. Import your repository" -ForegroundColor White
    Write-Host "3. Project settings are usually determined automatically" -ForegroundColor White
    Write-Host "4. Click 'Deploy' to finish" -ForegroundColor White
    
    $openVercel = Read-Host "Would you like to open Vercel in browser? (y/n)"
    if ($openVercel -eq "y") {
        Start-Process "https://vercel.com/import"
    }
} else {
    Write-Host "An error occurred when pushing to GitHub. Please check error messages above." -ForegroundColor Red
}

Write-Host "`nProcess completed." -ForegroundColor Cyan 