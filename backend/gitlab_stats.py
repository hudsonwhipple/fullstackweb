import json
import requests

gitlab_project_id = '59330677'
gitlab_access_token = 'glpat-1xy11CZ5q9ps6cjSeruK'

# Prints out the number of commits performed by each project member
def get_commits():
    gitlab_commits_url = f'https://gitlab.com/api/v4/projects/{gitlab_project_id}/repository/commits'

    headers = {'PRIVATE-TOKEN': gitlab_access_token}

    params = {'per_page': 100, 'page': 1}
    
    commits = []
    response = requests.get(gitlab_commits_url, headers=headers, params=params)
    if response.status_code == 200:
        response = response.json()
        commits.extend(response)
    
    commits_per_author = {}
    for commit in commits:
        new_name = commit['author_name'].split(' ')
        if (len(new_name) > 1):
            new_name = new_name[0] + new_name[-1]
        else:
            new_name = new_name[0]

        if (new_name not in commits_per_author):
            commits_per_author[new_name] = 1
        else:
            commits_per_author[new_name] += 1
    
    return commits_per_author

# Prints out the number of issues closed by each project member
def get_issues():
    gitlab_issues_url = f'https://gitlab.com/api/v4/projects/{gitlab_project_id}/issues'

    headers = {'PRIVATE-TOKEN': gitlab_access_token}
    params = {
        'state': 'closed',
        'per_page': 100,
        'page': 1
    }

    issues = []
    response = requests.get(gitlab_issues_url, headers=headers, params=params)

    if response.status_code == 200:
        response = response.json()
        issues.extend(response)
    
    issues_closed_by_member = {}
    for issue in issues:
        if 'closed_by' in issue and issue['closed_by']:
            new_name = issue['closed_by']['name'].split(' ')
            if (len(new_name) > 1):
                new_name = new_name[0] + new_name[-1]
            else:
                new_name = new_name[0]
            
            if new_name not in issues_closed_by_member:
                issues_closed_by_member[new_name] = 1
            else:
                issues_closed_by_member[new_name] += 1

    return issues_closed_by_member

# Check if API call resulted in error
def check_request_status(response):
    if response.status_code != 200:
        print(f"Received status code {response.status_code}")
        print(f"Response content: {response.content}")
        print(f"Response headers: {response.headers}")
        response.raise_for_status()

# Creates dictionary of project members' stats
# Example: 'Author Name': [# Commits, # Issues]
def get_gitlab_stats():
    stats = {}
    commits_per_member = get_commits()
    issues_per_member = get_issues()

    for member in commits_per_member:
        stats_for_member = []
        stats_for_member.append(commits_per_member[member])
        if member in issues_per_member:
            stats_for_member.append(issues_per_member[member])
        stats[member] = stats_for_member
    return stats

# print(get_gitlab_stats())