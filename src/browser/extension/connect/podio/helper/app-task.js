/**
 * Created by phucpnt on 5/28/16.
 */

export function getAppSetupConfig(workspaceId, {
    type = 'meeting',
    name = 'Dev Task',
    itemName = 'devtask',
    icon = '107.png',
}) {

  const fields = [
    {
      type: 'text',
      config: {
        label: 'Subject',
        settings: { size: 'small', format: 'plain' },
        required: true,
        external_id: 'subject'
      },
    },
    {
      type: 'category',
      config: {
        external_id: 'category',
        label: 'Category', settings: {
          options: [
            { text: 'Backlog' },
            { text: 'Feature' },
            { text: 'Bug' },
          ],
          multiple: true,
          display: 'inline',
        }
      }
    },
    {
      type: 'category',
      config: {
        external_id: 'status',
        label: 'Status', settings: {
          options: [
            { text: 'Not Started' },
            { text: 'WIP' },
            { text: 'Done' },
          ],
          multiple: true,
          display: 'inline',
        }
      }
    },
    {
      type: 'date',
      external_id: 'startDate',
      config: {
        label: 'Start date', settings: {
          calendar: true,
          end: 'disabled',
          time: 'disabled',
        },
        mapping: 'meeting_time',
      }
    },
    {
      type: 'duration',
      config: {
        external_id: 'estHours',
        label: 'Est. duration', settings: {
          fields: ['days', 'hours'],
        }
      }
    },
    {
      type: 'app',
      config: {
        external_id: 'relatedTo',
        label: 'Related to', settings: {
          multiple: true,
        },
      }
    },
    {
      type: 'contact',
      config: {
        external_id: 'assignee',
        label: 'Assignee', settings: {
          type: 'space_users'
        }
      }
    },
    {
      type: 'text',
      config: {
        external_id: 'description',
        label: 'Description', settings: {
          size: 'large',
          format: 'html'
        }
      }
    }
  ];

  return {
    space_id: workspaceId,
    config: {
      type,
      name,
      item_name: itemName,
      icon,
    },
    fields: fields.map((field, index) => {
      field.config.delta = index;
      return field;
    }),
  };

}
