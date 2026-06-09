import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import { Table, Input, Space, Card, Tag, Button, Typography } from "antd";

import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const DataTable = ({ columns, data, title = "Data Table" }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const antColumns = useMemo(() => {
    return columns.map((col) => ({
      title: (
        <Space>
          {col.header}
          {table.getColumn(col.accessorKey)?.getIsSorted() === "asc" && (
            <ArrowUpOutlined />
          )}
          {table.getColumn(col.accessorKey)?.getIsSorted() === "desc" && (
            <ArrowDownOutlined />
          )}
        </Space>
      ),

      dataIndex: col.accessorKey,
      key: col.accessorKey,

      onHeaderCell: () => ({
        onClick: () => table.getColumn(col.accessorKey)?.toggleSorting(),
        style: {
          cursor: "pointer",
        },
      }),

      render: (value, record, index) => {
        if (!col.cell) {
          return value;
        }

        return col.cell({
          getValue: () => value,
          row: {
            original: record,
            index,
          },
        });
      },
    }));
  }, [columns, table]);

  const tableData = table.getRowModel().rows.map((row) => row.original);

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Text strong style={{ fontSize: 18 }}>
            {title}
          </Text>

          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            style={{
              width: 280,
              maxWidth: "100%",
            }}
          />
        </div>

        <Table
          columns={antColumns}
          dataSource={tableData}
          rowKey="id"
          pagination={{
            pageSize: table.getState().pagination.pageSize,
            current: table.getState().pagination.pageIndex + 1,
            total: table.getFilteredRowModel().rows.length,
            onChange: (page, pageSize) => {
              table.setPageIndex(page - 1);
              table.setPageSize(pageSize);
            },
            showSizeChanger: true,
          }}
          scroll={{ x: 900 }}
          sticky
          bordered={false}
          size="middle"
          locale={{
            emptyText: "No records found",
          }}
        />
      </Space>
    </Card>
  );
};

export default DataTable;
