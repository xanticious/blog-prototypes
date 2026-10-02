---
slug: getting-started-with-git
title: "Git, Briefly, for People Who Write"
dek: "Git is a labeled box of drafts. You do not have to become a programmer to keep one."
published: "2026-05-25"
genre: fantasy
tags: git, saving, versions, beginners
---

A piece of writing can survive in more than one telling. You can still ask which version you are holding. Git is a small, practical version of that question for your own files: what did this essay say last Tuesday, and can I get that wording back?

You do not need Git to write. You need it when more than one person touches the same folder, or when you want a history that is better than “essay-final-final-2.”

## The picture

Think of a folder of drafts on a desk.

- A **commit** is one labeled draft. The label is a sentence you write: “Add the new review” or “Fix the spoiler note.”
- **Git** is the record of those drafts, kept in order.
- A **push** sends the latest drafts to a shared shelf, often GitHub, so they are not only on your laptop.
- A **repository** is the project folder plus that history. This blog is one repository.

You can ignore branches, pull requests, and merge conflicts until the day a sentence collides with someone else’s sentence. When that day comes, a person who uses Git every day can sit with you for twenty minutes. Until then, three commands are the whole habit.

## Three commands

Open a terminal in the project folder. A terminal is a window where you type instructions instead of clicking. On a Mac it is called Terminal. On Windows, the same idea is often PowerShell. Then:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

`git add .` means “include the files I just saved.” The dot means this folder.

`git commit` takes the snapshot and asks you for the label. Write the label for a future you who is tired. “Update reading journal post” is a good label. “Stuff” is a bad one.

`git push` copies the snapshot to the shared shelf. If the command says you are up to date, there was nothing new to send.

## What you can skip for now

You do not need to memorize how Git stores text. You do not need a graph of branches on the wall. You do not need to rewrite history. If a command answers with a paragraph you do not understand, copy the paragraph to the person who set the site up, and do not keep typing hopeful variations.

Save the file before you commit. Git records what is on the disk, not what is still unsaved in the editor.

That is the introduction. A history of drafts, three commands, and permission to stop there. Getting home to an earlier sentence is the whole point.
