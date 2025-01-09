import React from 'react';
import { Table } from 'antd';
import { useTable } from '@refinedev/core';

export const AdminKanban: React.FC = () => {
  const { tableQueryResult } = useTable({
    resource: "tasks",
    initialSorter: [{ field: "status", order: "asc" }],
  });

  const { data, isLoading } = tableQueryResult;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (_: any, record: { assignee: { name: any; }; }) => record?.assignee?.name || "Unassigned",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (_: any, record: { due_date: string | number | Date; }) => 
        record?.due_date ? new Date(record.due_date).toLocaleDateString() : "No date set",
    },
  ];

  return (
    <div>
      <h1>Admin Kanban View</h1>
      <Table
        dataSource={data?.data}
        loading={isLoading}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};