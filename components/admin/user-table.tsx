'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';

interface UserTableProps {
  users: any[];
  onDelete: (id: string) => void;
}

export default function UserTable({ users, onDelete }: UserTableProps) {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };
  
  const handleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  
  const renderSortIcon = (field: string) => {
    if (field !== sortField) return <i className="ri-arrow-up-down-line ml-1 text-gray-400"></i>;
    return sortDirection === 'asc' 
      ? <i className="ri-arrow-up-line ml-1 text-primary-500"></i>
      : <i className="ri-arrow-down-line ml-1 text-primary-500"></i>;
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            checked={selectedUsers.length === users.length && users.length > 0}
            onChange={handleSelectAll}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            {selectedUsers.length} selected
          </span>
        </div>
        
        {selectedUsers.length > 0 && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <i className="ri-mail-line mr-1"></i>
              Email
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
              <i className="ri-delete-bin-line mr-1"></i>
              Delete
            </Button>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 border-b border-gray-200 w-10">
                <span className="sr-only">Select</span>
              </th>
              <th 
                className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {renderSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center">
                  Email
                  {renderSortIcon('email')}
                </div>
              </th>
              <th 
                className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center">
                  Role
                  {renderSortIcon('role')}
                </div>
              </th>
              <th 
                className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon('status')}
                </div>
              </th>
              <th 
                className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center">
                  Joined
                  {renderSortIcon('createdAt')}
                </div>
              </th>
              <th className="px-6 py-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              sortedUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="font-medium text-primary-700">
                            {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : user.role === 'manager'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center ${
                      user.status === 'active'
                        ? 'text-green-800'
                        : user.status === 'inactive'
                          ? 'text-gray-500'
                          : 'text-red-800'
                    }`}>
                      <span className={`h-2 w-2 rounded-full mr-2 ${
                        user.status === 'active'
                          ? 'bg-green-500'
                          : user.status === 'inactive'
                            ? 'bg-gray-400'
                            : 'bg-red-500'
                      }`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/admin/users/${user.id}`}>
                        <button className="text-primary-600 hover:text-primary-900">
                          <i className="ri-edit-line"></i>
                        </button>
                      </Link>
                      <button 
                        onClick={() => onDelete(user.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{sortedUsers.length}</span> users
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            <i className="ri-arrow-left-s-line mr-1"></i>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <i className="ri-arrow-right-s-line ml-1"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}