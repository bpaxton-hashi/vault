/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { click, findAll } from '@ember/test-helpers';

import { LICENSE_START } from 'vault/mirage/handlers/clients';
import { addMonths } from 'date-fns';
import { CLIENT_COUNT } from './client-count-selectors';

export async function dateDropdownSelect(month, year) {
  const { dateDropdown, counts } = CLIENT_COUNT;
  await click(counts.startEdit);
  await click(dateDropdown.toggleMonth);
  await click(dateDropdown.selectMonth(month));
  await click(dateDropdown.toggleYear);
  await click(dateDropdown.selectYear(year));
  await click(dateDropdown.submit);
}

export function assertBarChart(assert, chartName, byMonthData) {
  // assertion count is byMonthData.length + 2
  const chart = CLIENT_COUNT.charts.chart(chartName);
  const dataBars = findAll(`${chart} ${CLIENT_COUNT.charts.dataBar}`).filter((b) => b.hasAttribute('height'));
  const xAxisLabels = findAll(`${chart} ${CLIENT_COUNT.charts.xAxisLabel}`);

  assert.strictEqual(
    dataBars.length,
    byMonthData.filter((m) => m.clients).length,
    `${chartName}: it renders bars for each non-zero month`
  );

  assert.strictEqual(
    xAxisLabels.length,
    byMonthData.length,
    `${chartName}: it renders a label for each month`
  );

  xAxisLabels.forEach((e, i) => {
    assert.dom(e).hasText(`${byMonthData[i].month}`, `renders x-axis label: ${byMonthData[i].month}`);
  });
}

export const ACTIVITY_RESPONSE_STUB = {
  start_time: '2023-08-01T00:00:00Z',
  end_time: '2023-09-30T23:59:59Z', // is always the last day and hour of the month queried
  by_namespace: [
    {
      namespace_id: 'e67m31',
      namespace_path: 'ns1',
      counts: {
        acme_clients: 5699,
        clients: 18903,
        entity_clients: 4256,
        non_entity_clients: 4138,
        secret_syncs: 4810,
        distinct_entities: 4256,
        non_entity_tokens: 4138,
      },
      mounts: [
        {
          mount_path: 'auth/authid/0',
          counts: {
            acme_clients: 0,
            clients: 8394,
            entity_clients: 4256,
            non_entity_clients: 4138,
            secret_syncs: 0,
            distinct_entities: 4256,
            non_entity_tokens: 4138,
          },
        },
        {
          mount_path: 'kvv2-engine-0',
          counts: {
            acme_clients: 0,
            clients: 4810,
            entity_clients: 0,
            non_entity_clients: 0,
            secret_syncs: 4810,
            distinct_entities: 0,
            non_entity_tokens: 0,
          },
        },
        {
          mount_path: 'pki-engine-0',
          counts: {
            acme_clients: 5699,
            clients: 5699,
            entity_clients: 0,
            non_entity_clients: 0,
            secret_syncs: 0,
            distinct_entities: 0,
            non_entity_tokens: 0,
          },
        },
      ],
    },
    {
      namespace_id: 'root',
      namespace_path: '',
      counts: {
        acme_clients: 4003,
        clients: 16384,
        entity_clients: 4002,
        non_entity_clients: 4089,
        secret_syncs: 4290,
        distinct_entities: 4002,
        non_entity_tokens: 4089,
      },
      mounts: [
        {
          mount_path: 'auth/authid/0',
          counts: {
            acme_clients: 0,
            clients: 8091,
            entity_clients: 4002,
            non_entity_clients: 4089,
            secret_syncs: 0,
            distinct_entities: 4002,
            non_entity_tokens: 4089,
          },
        },
        {
          mount_path: 'kvv2-engine-0',
          counts: {
            acme_clients: 0,
            clients: 4290,
            entity_clients: 0,
            non_entity_clients: 0,
            secret_syncs: 4290,
            distinct_entities: 0,
            non_entity_tokens: 0,
          },
        },
        {
          mount_path: 'pki-engine-0',
          counts: {
            acme_clients: 4003,
            clients: 4003,
            entity_clients: 0,
            non_entity_clients: 0,
            secret_syncs: 0,
            distinct_entities: 0,
            non_entity_tokens: 0,
          },
        },
      ],
    },
  ],
  months: [
    {
      timestamp: '2023-08-01T00:00:00Z',
      counts: null,
      namespaces: null,
      new_clients: null,
    },
    {
      timestamp: '2023-09-01T00:00:00Z',
      counts: {
        acme_clients: 1928,
        clients: 3928,
        entity_clients: 832,
        non_entity_clients: 930,
        secret_syncs: 238,
        distinct_entities: 832,
        non_entity_tokens: 930,
      },
      namespaces: [
        {
          namespace_id: 'e67m31',
          namespace_path: 'ns1',
          counts: {
            acme_clients: 934,
            clients: 1981,
            entity_clients: 708,
            non_entity_clients: 182,
            secret_syncs: 157,
            distinct_entities: 708,
            non_entity_tokens: 182,
          },
          mounts: [
            {
              mount_path: 'pki-engine-0',
              counts: {
                acme_clients: 934,
                clients: 934,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
                distinct_entities: 0,
                non_entity_tokens: 0,
              },
            },
            {
              mount_path: 'auth/authid/0',
              counts: {
                acme_clients: 0,
                clients: 890,
                entity_clients: 708,
                non_entity_clients: 182,
                secret_syncs: 0,
                distinct_entities: 0,
                non_entity_tokens: 0,
              },
            },
            {
              mount_path: 'kvv2-engine-0',
              counts: {
                acme_clients: 0,
                clients: 157,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 157,
                distinct_entities: 0,
                non_entity_tokens: 0,
              },
            },
          ],
        },
        {
          namespace_id: 'root',
          namespace_path: '',
          counts: {
            acme_clients: 994,
            clients: 1947,
            entity_clients: 124,
            non_entity_clients: 748,
            secret_syncs: 81,
            distinct_entities: 124,
            non_entity_tokens: 748,
          },
          mounts: [
            {
              mount_path: 'pki-engine-0',
              counts: {
                acme_clients: 994,
                clients: 994,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
                distinct_entities: 0,
                non_entity_tokens: 0,
              },
            },
            {
              mount_path: 'auth/authid/0',
              counts: {
                acme_clients: 0,
                clients: 872,
                entity_clients: 124,
                non_entity_clients: 748,
                secret_syncs: 0,
                distinct_entities: 0,
                non_entity_tokens: 0,
              },
            },
            {
              mount_path: 'kvv2-engine-0',
              counts: {
                acme_clients: 0,
                clients: 81,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 81,
                distinct_entities: 0,
                non_entity_tokens: 0,
              },
            },
          ],
        },
      ],
      new_clients: {
        counts: {
          acme_clients: 144,
          clients: 364,
          entity_clients: 59,
          non_entity_clients: 112,
          secret_syncs: 49,
          distinct_entities: 59,
          non_entity_tokens: 112,
        },
        namespaces: [
          {
            namespace_id: 'root',
            namespace_path: '',
            counts: {
              acme_clients: 91,
              clients: 191,
              entity_clients: 25,
              non_entity_clients: 50,
              secret_syncs: 25,
              distinct_entities: 25,
              non_entity_tokens: 50,
            },
            mounts: [
              {
                mount_path: 'pki-engine-0',
                counts: {
                  acme_clients: 91,
                  clients: 91,
                  entity_clients: 0,
                  non_entity_clients: 0,
                  secret_syncs: 0,
                  distinct_entities: 0,
                  non_entity_tokens: 0,
                },
              },
              {
                mount_path: 'auth/authid/0',
                counts: {
                  acme_clients: 0,
                  clients: 75,
                  entity_clients: 25,
                  non_entity_clients: 50,
                  secret_syncs: 0,
                  distinct_entities: 0,
                  non_entity_tokens: 0,
                },
              },
              {
                mount_path: 'kvv2-engine-0',
                counts: {
                  acme_clients: 0,
                  clients: 25,
                  entity_clients: 0,
                  non_entity_clients: 0,
                  secret_syncs: 25,
                  distinct_entities: 0,
                  non_entity_tokens: 0,
                },
              },
            ],
          },
          {
            namespace_id: 'e67m31',
            namespace_path: 'ns1',
            counts: {
              acme_clients: 53,
              clients: 173,
              entity_clients: 34,
              non_entity_clients: 62,
              secret_syncs: 24,
              distinct_entities: 34,
              non_entity_tokens: 62,
            },
            mounts: [
              {
                mount_path: 'auth/authid/0',
                counts: {
                  acme_clients: 0,
                  clients: 96,
                  entity_clients: 34,
                  non_entity_clients: 62,
                  secret_syncs: 0,
                  distinct_entities: 0,
                  non_entity_tokens: 0,
                },
              },
              {
                mount_path: 'pki-engine-0',
                counts: {
                  acme_clients: 53,
                  clients: 53,
                  entity_clients: 0,
                  non_entity_clients: 0,
                  secret_syncs: 0,
                  distinct_entities: 0,
                  non_entity_tokens: 0,
                },
              },
              {
                mount_path: 'kvv2-engine-0',
                counts: {
                  acme_clients: 0,
                  clients: 24,
                  entity_clients: 0,
                  non_entity_clients: 0,
                  secret_syncs: 24,
                  distinct_entities: 0,
                  non_entity_tokens: 0,
                },
              },
            ],
          },
        ],
      },
    },
  ],
  total: {
    acme_clients: 9702,
    clients: 35287,
    entity_clients: 8258,
    non_entity_clients: 8227,
    secret_syncs: 9100,
    distinct_entities: 8258,
    non_entity_tokens: 8227,
  },
};

// combined activity data before and after 1.10 upgrade when Vault added mount attribution
export const MIXED_ACTIVITY_RESPONSE_STUB = {
  start_time: '2024-03-01T00:00:00Z',
  end_time: '2024-04-30T23:59:59Z',
  total: {
    acme_clients: 0,
    clients: 3,
    distinct_entities: 3,
    entity_clients: 3,
    non_entity_clients: 0,
    non_entity_tokens: 0,
    secret_syncs: 0,
  },
  by_namespace: [
    {
      counts: {
        acme_clients: 0,
        clients: 3,
        distinct_entities: 3,
        entity_clients: 3,
        non_entity_clients: 0,
        non_entity_tokens: 0,
        secret_syncs: 0,
      },
      mounts: [
        {
          counts: {
            acme_clients: 0,
            clients: 2,
            distinct_entities: 2,
            entity_clients: 2,
            non_entity_clients: 0,
            non_entity_tokens: 0,
            secret_syncs: 0,
          },
          mount_path: 'no mount accessor (pre-1.10 upgrade?)',
        },
        {
          counts: {
            acme_clients: 0,
            clients: 1,
            distinct_entities: 1,
            entity_clients: 1,
            non_entity_clients: 0,
            non_entity_tokens: 0,
            secret_syncs: 0,
          },
          mount_path: 'auth/u/',
        },
      ],
      namespace_id: 'root',
      namespace_path: '',
    },
  ],
  months: [
    {
      counts: null,
      namespaces: null,
      new_clients: null,
      timestamp: '2024-03-01T00:00:00Z',
    },
    {
      counts: {
        acme_clients: 0,
        clients: 3,
        distinct_entities: 0,
        entity_clients: 3,
        non_entity_clients: 0,
        non_entity_tokens: 0,
        secret_syncs: 0,
      },
      namespaces: [
        {
          counts: {
            acme_clients: 0,
            clients: 3,
            distinct_entities: 0,
            entity_clients: 3,
            non_entity_clients: 0,
            non_entity_tokens: 0,
            secret_syncs: 0,
          },
          mounts: [
            {
              counts: {
                acme_clients: 0,
                clients: 2,
                distinct_entities: 0,
                entity_clients: 2,
                non_entity_clients: 0,
                non_entity_tokens: 0,
                secret_syncs: 0,
              },
              mount_path: 'no mount accessor (pre-1.10 upgrade?)',
            },
            {
              counts: {
                acme_clients: 0,
                clients: 1,
                distinct_entities: 0,
                entity_clients: 1,
                non_entity_clients: 0,
                non_entity_tokens: 0,
                secret_syncs: 0,
              },
              mount_path: 'auth/u/',
            },
          ],
          namespace_id: 'root',
          namespace_path: '',
        },
      ],
      new_clients: {
        counts: {
          acme_clients: 0,
          clients: 3,
          distinct_entities: 0,
          entity_clients: 3,
          non_entity_clients: 0,
          non_entity_tokens: 0,
          secret_syncs: 0,
        },
        namespaces: [
          {
            counts: {
              acme_clients: 0,
              clients: 3,
              distinct_entities: 0,
              entity_clients: 3,
              non_entity_clients: 0,
              non_entity_tokens: 0,
              secret_syncs: 0,
            },
            mounts: [
              {
                counts: {
                  acme_clients: 0,
                  clients: 2,
                  distinct_entities: 0,
                  entity_clients: 2,
                  non_entity_clients: 0,
                  non_entity_tokens: 0,
                  secret_syncs: 0,
                },
                mount_path: 'no mount accessor (pre-1.10 upgrade?)',
              },
              {
                counts: {
                  acme_clients: 0,
                  clients: 1,
                  distinct_entities: 0,
                  entity_clients: 1,
                  non_entity_clients: 0,
                  non_entity_tokens: 0,
                  secret_syncs: 0,
                },
                mount_path: 'auth/u/',
              },
            ],
            namespace_id: 'root',
            namespace_path: '',
          },
        ],
      },
      timestamp: '2024-04-01T00:00:00Z',
    },
  ],
};
// format returned by model hook in routes/vault/cluster/clients.ts
export const VERSION_HISTORY = [
  {
    version: '1.9.0',
    previousVersion: null,
    timestampInstalled: LICENSE_START.toISOString(),
  },
  {
    version: '1.9.1',
    previousVersion: '1.9.0',
    timestampInstalled: addMonths(LICENSE_START, 1).toISOString(),
  },
  {
    version: '1.10.1',
    previousVersion: '1.9.1',
    timestampInstalled: addMonths(LICENSE_START, 2).toISOString(),
  },
  {
    version: '1.14.4',
    previousVersion: '1.10.1',
    timestampInstalled: addMonths(LICENSE_START, 3).toISOString(),
  },
  {
    version: '1.16.0',
    previousVersion: '1.14.4',
    timestampInstalled: addMonths(LICENSE_START, 4).toISOString(),
  },
];

// order of this array matters because index 0 is a month without data
export const SERIALIZED_ACTIVITY_RESPONSE = {
  total: {
    acme_clients: 9702,
    clients: 35287,
    entity_clients: 8258,
    non_entity_clients: 8227,
    secret_syncs: 9100,
  },
  by_namespace: [
    {
      label: 'ns1',
      acme_clients: 5699,
      clients: 18903,
      entity_clients: 4256,
      non_entity_clients: 4138,
      secret_syncs: 4810,
      mounts: [
        {
          label: 'auth/authid/0',
          acme_clients: 0,
          clients: 8394,
          entity_clients: 4256,
          non_entity_clients: 4138,
          secret_syncs: 0,
        },
        {
          label: 'kvv2-engine-0',
          acme_clients: 0,
          clients: 4810,
          entity_clients: 0,
          non_entity_clients: 0,
          secret_syncs: 4810,
        },
        {
          label: 'pki-engine-0',
          acme_clients: 5699,
          clients: 5699,
          entity_clients: 0,
          non_entity_clients: 0,
          secret_syncs: 0,
        },
      ],
    },
    {
      label: 'root',
      acme_clients: 4003,
      clients: 16384,
      entity_clients: 4002,
      non_entity_clients: 4089,
      secret_syncs: 4290,
      mounts: [
        {
          label: 'auth/authid/0',
          acme_clients: 0,
          clients: 8091,
          entity_clients: 4002,
          non_entity_clients: 4089,
          secret_syncs: 0,
        },
        {
          label: 'kvv2-engine-0',
          acme_clients: 0,
          clients: 4290,
          entity_clients: 0,
          non_entity_clients: 0,
          secret_syncs: 4290,
        },
        {
          label: 'pki-engine-0',
          acme_clients: 4003,
          clients: 4003,
          entity_clients: 0,
          non_entity_clients: 0,
          secret_syncs: 0,
        },
      ],
    },
  ],
  by_month: [
    {
      month: '8/23',
      timestamp: '2023-08-01T00:00:00Z',
      namespaces: [],
      namespaces_by_key: {},
      new_clients: {
        month: '8/23',
        timestamp: '2023-08-01T00:00:00Z',
        namespaces: [],
      },
    },
    {
      month: '9/23',
      timestamp: '2023-09-01T00:00:00Z',
      acme_clients: 1928,
      clients: 3928,
      entity_clients: 832,
      non_entity_clients: 930,
      secret_syncs: 238,
      namespaces: [
        {
          label: 'ns1',
          acme_clients: 934,
          clients: 1981,
          entity_clients: 708,
          non_entity_clients: 182,
          secret_syncs: 157,
          mounts: [
            {
              label: 'pki-engine-0',
              acme_clients: 934,
              clients: 934,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 0,
            },
            {
              label: 'auth/authid/0',
              acme_clients: 0,
              clients: 890,
              entity_clients: 708,
              non_entity_clients: 182,
              secret_syncs: 0,
            },
            {
              label: 'kvv2-engine-0',
              acme_clients: 0,
              clients: 157,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 157,
            },
          ],
        },
        {
          label: 'root',
          acme_clients: 994,
          clients: 1947,
          entity_clients: 124,
          non_entity_clients: 748,
          secret_syncs: 81,
          mounts: [
            {
              label: 'pki-engine-0',
              acme_clients: 994,
              clients: 994,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 0,
            },
            {
              label: 'auth/authid/0',
              acme_clients: 0,
              clients: 872,
              entity_clients: 124,
              non_entity_clients: 748,
              secret_syncs: 0,
            },
            {
              label: 'kvv2-engine-0',
              acme_clients: 0,
              clients: 81,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 81,
            },
          ],
        },
      ],
      namespaces_by_key: {
        ns1: {
          acme_clients: 934,
          clients: 1981,
          entity_clients: 708,
          non_entity_clients: 182,
          secret_syncs: 157,
          timestamp: '2023-09-01T00:00:00Z',
          month: '9/23',
          new_clients: {
            month: '9/23',
            timestamp: '2023-09-01T00:00:00Z',
            label: 'ns1',
            acme_clients: 53,
            clients: 173,
            entity_clients: 34,
            non_entity_clients: 62,
            secret_syncs: 24,
            mounts: [
              {
                label: 'auth/authid/0',
                acme_clients: 0,
                clients: 96,
                entity_clients: 34,
                non_entity_clients: 62,
                secret_syncs: 0,
              },
              {
                label: 'pki-engine-0',
                acme_clients: 53,
                clients: 53,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
              },
              {
                label: 'kvv2-engine-0',
                acme_clients: 0,
                clients: 24,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 24,
              },
            ],
          },
          mounts_by_key: {
            'pki-engine-0': {
              label: 'pki-engine-0',
              acme_clients: 934,
              clients: 934,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 0,
              timestamp: '2023-09-01T00:00:00Z',
              month: '9/23',
              new_clients: {
                month: '9/23',
                timestamp: '2023-09-01T00:00:00Z',
                label: 'pki-engine-0',
                acme_clients: 53,
                clients: 53,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
              },
            },
            'auth/authid/0': {
              label: 'auth/authid/0',
              acme_clients: 0,
              clients: 890,
              entity_clients: 708,
              non_entity_clients: 182,
              secret_syncs: 0,
              timestamp: '2023-09-01T00:00:00Z',
              month: '9/23',
              new_clients: {
                month: '9/23',
                timestamp: '2023-09-01T00:00:00Z',
                label: 'auth/authid/0',
                acme_clients: 0,
                clients: 96,
                entity_clients: 34,
                non_entity_clients: 62,
                secret_syncs: 0,
              },
            },
            'kvv2-engine-0': {
              label: 'kvv2-engine-0',
              acme_clients: 0,
              clients: 157,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 157,
              timestamp: '2023-09-01T00:00:00Z',
              month: '9/23',
              new_clients: {
                month: '9/23',
                timestamp: '2023-09-01T00:00:00Z',
                label: 'kvv2-engine-0',
                acme_clients: 0,
                clients: 24,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 24,
              },
            },
          },
        },
        root: {
          acme_clients: 994,
          clients: 1947,
          entity_clients: 124,
          non_entity_clients: 748,
          secret_syncs: 81,
          timestamp: '2023-09-01T00:00:00Z',
          month: '9/23',
          new_clients: {
            month: '9/23',
            timestamp: '2023-09-01T00:00:00Z',
            label: 'root',
            acme_clients: 91,
            clients: 191,
            entity_clients: 25,
            non_entity_clients: 50,
            secret_syncs: 25,
            mounts: [
              {
                label: 'pki-engine-0',
                acme_clients: 91,
                clients: 91,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
              },
              {
                label: 'auth/authid/0',
                acme_clients: 0,
                clients: 75,
                entity_clients: 25,
                non_entity_clients: 50,
                secret_syncs: 0,
              },
              {
                label: 'kvv2-engine-0',
                acme_clients: 0,
                clients: 25,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 25,
              },
            ],
          },
          mounts_by_key: {
            'pki-engine-0': {
              label: 'pki-engine-0',
              acme_clients: 994,
              clients: 994,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 0,
              timestamp: '2023-09-01T00:00:00Z',
              month: '9/23',
              new_clients: {
                month: '9/23',
                timestamp: '2023-09-01T00:00:00Z',
                label: 'pki-engine-0',
                acme_clients: 91,
                clients: 91,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
              },
            },
            'auth/authid/0': {
              label: 'auth/authid/0',
              acme_clients: 0,
              clients: 872,
              entity_clients: 124,
              non_entity_clients: 748,
              secret_syncs: 0,
              timestamp: '2023-09-01T00:00:00Z',
              month: '9/23',
              new_clients: {
                month: '9/23',
                timestamp: '2023-09-01T00:00:00Z',
                label: 'auth/authid/0',
                acme_clients: 0,
                clients: 75,
                entity_clients: 25,
                non_entity_clients: 50,
                secret_syncs: 0,
              },
            },
            'kvv2-engine-0': {
              label: 'kvv2-engine-0',
              acme_clients: 0,
              clients: 81,
              entity_clients: 0,
              non_entity_clients: 0,
              secret_syncs: 81,
              timestamp: '2023-09-01T00:00:00Z',
              month: '9/23',
              new_clients: {
                month: '9/23',
                timestamp: '2023-09-01T00:00:00Z',
                label: 'kvv2-engine-0',
                acme_clients: 0,
                clients: 25,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 25,
              },
            },
          },
        },
      },
      new_clients: {
        month: '9/23',
        timestamp: '2023-09-01T00:00:00Z',
        acme_clients: 144,
        clients: 364,
        entity_clients: 59,
        non_entity_clients: 112,
        secret_syncs: 49,
        namespaces: [
          {
            label: 'root',
            acme_clients: 91,
            clients: 191,
            entity_clients: 25,
            non_entity_clients: 50,
            secret_syncs: 25,
            mounts: [
              {
                label: 'pki-engine-0',
                acme_clients: 91,
                clients: 91,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
              },
              {
                label: 'auth/authid/0',
                acme_clients: 0,
                clients: 75,
                entity_clients: 25,
                non_entity_clients: 50,
                secret_syncs: 0,
              },
              {
                label: 'kvv2-engine-0',
                acme_clients: 0,
                clients: 25,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 25,
              },
            ],
          },
          {
            label: 'ns1',
            acme_clients: 53,
            clients: 173,
            entity_clients: 34,
            non_entity_clients: 62,
            secret_syncs: 24,
            mounts: [
              {
                label: 'auth/authid/0',
                acme_clients: 0,
                clients: 96,
                entity_clients: 34,
                non_entity_clients: 62,
                secret_syncs: 0,
              },
              {
                label: 'pki-engine-0',
                acme_clients: 53,
                clients: 53,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 0,
              },
              {
                label: 'kvv2-engine-0',
                acme_clients: 0,
                clients: 24,
                entity_clients: 0,
                non_entity_clients: 0,
                secret_syncs: 24,
              },
            ],
          },
        ],
      },
    },
  ],
};
