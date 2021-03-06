{% load djblets_js reviewtags %}

    el: document.body,
    reviewRequestData: {
        bugTrackerURL: "{{review_request.repository.bug_tracker|escapejs}}",
        id: {{review_request.display_id}},
        localSitePrefix: "{% if review_request.local_site %}s/{{review_request.local_site.name}}/{% endif %}",
        branch: "{{review_request_details.branch|escapejs}}",
        bugsClosed: {{review_request_details.get_bug_list|json_dumps}},
{% if draft.changedesc %}
        changeDescription: "{{draft.changedesc.text|escapejs}}",
{% endif %}
        description: "{{review_request_details.description|escapejs}}",
        hasDraft: {% if draft %}true{% else %}false{% endif %},
        public: {% if review_request.public %}true{% else %}false{% endif %},
        reviewURL: "{{review_request.get_absolute_url|escapejs}}",
        summary: "{{review_request_details.summary|escapejs}}",
        targetGroups: [{% spaceless %}
{% for group in review_request_details.target_groups.all %}
            {
                name: "{{group.name|escapejs}}",
                url: "{{group.get_absolute_url}}"
            }{% if not forloop.last %},{% endif %}
{% endfor %}{% endspaceless %}],
        targetPeople: [{% spaceless %}
{% for user in review_request_details.target_people.all %}
            {
                username: "{{user.username|escapejs}}",
                url: "{{user.get_absolute_url}}"
            }{% if not forloop.last %},{% endif %}
{% endfor %}{% endspaceless %}],
        testingDone: "{{review_request_details.testing_done|escapejs}}"
    },
    editorData: {
        editable: {% if review_request.status == 'P' %}true{% else %}false{% endif %},
        fileAttachmentComments: {
{% if file_attachments %}
{%  for file_attachment in file_attachments %}
            {{file_attachment.id}}: {% file_attachment_comments file_attachment %}{% if not forloop.last %},{% endif %}
{%  endfor %}
{% endif %}
        }
    }

