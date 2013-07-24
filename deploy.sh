#!/usr/bin/env bash
set -e #abort if any command fails

deploy_directory=dist
deploy_branch=gh-pages

#if no user identity is already set in the current git environment, use this:
default_username=deploy.sh
default_email=XX1011+$default_user@gmail.com

commit_title=`git log -n 1 --format="%s" HEAD`
commit_hash=`git log -n 1 --format="%H" HEAD`

set_user_id() {
	if [[ -z `git config user.name` ]]; then
		git config user.name "$default_username"
	fi
	if [[ -z `git config user.email` ]]; then
		git config user.email "$default_email"
	fi
}

previous_branch=`git rev-parse --abbrev-ref HEAD`
if [[ $previous_branch = "HEAD" ]]; then
	previous_branch=$commit_hash
fi

if ! ( git diff --exit-code --quiet \
    && git diff --exit-code --quiet --cached ); then
	echo Aborting due to uncommitted changes
	exit 1
fi

git --work-tree "$deploy_directory" checkout $deploy_branch --force
git --work-tree "$deploy_directory" add --all

if git --work-tree "$deploy_directory" diff --exit-code --quiet HEAD; then
	echo No changes to files in $deploy_directory. Skipping commit.
else
	set_user_id
	git --work-tree "$deploy_directory" commit -m \
		"publish: $commit_title"$'\n\n'"generated from commit $commit_hash"
	git push origin $deploy_branch
fi

git checkout $previous_branch --force
