# Fulll test - Frontend

This project is a React-based application that allows you to search for github users, using the GitHub REST API.

**Here is the list of the main features:**

✅ **Debounced search:** prevents unnecessary API calls by waiting for the user to stop typing.

✅ **Loading and error handling:** displays a loader while fetching and meaningful error messages.

✅ **Empty state:** displays an empty state if no user was found

✅ **Rate limit awareness:** if the GitHub API rate limit is reached, the user is informed when they can retry, and no further API calls are made until the limit resets.

✅ **Duplicate or delete selected users:** users can be selected for duplication or deletion

