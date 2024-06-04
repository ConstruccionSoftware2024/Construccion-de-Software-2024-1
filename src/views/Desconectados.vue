<template>
    <ul role="list" class="divide-y divide-gray-100 custom-width ml-9 pl-3 pr-7 custom-height shadow-lg shadow-color-shadowbg p-1">
      <li v-for="person in people" :key="person.email" class="flex justify-between py-3" >
        <div class="flex min-w-0 gap-x-4">
          <img class="h-16 w-16 flex-none rounded-full bg-online" :src="person.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
          <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
          </p>
        </div>
      </li>
    </ul>
  </template>
  
<script setup>
  const people = [
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Estudiante',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    },
    
  ]
</script>
  
<style scoped>
  .custom-width {
    width: 90%;
  }
</style>