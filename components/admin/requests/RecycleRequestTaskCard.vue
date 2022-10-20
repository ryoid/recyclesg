<template>
  <NuxtLink :href="`/admin/requests/${request.id}`">
    <div
      class="h-24 flex px-3 py-3 gap-3 cursor-pointer rounded-lg transition hover:bg-neutral-100 group saturate-[0.8] hover:saturate-100">
      <div class="relative h-full aspect-square bg-neutral-50 rounded-lg ">
        <img class="absolute inset-0 aspect-square object-cover rounded-lg" :src="request.image" />
      </div>
      <div>
        <div class="inline-flex gap-1.5">
          {{ request.title }}
          <Tag :name="request.status" :color="getStatusColor(request.status)" />
        </div>
        <div class="text-sm text-neutral-400">
          <span v-if="request.status === 'completed' && request.completedAt">Completed {{
          formatDate(request.completedAt)
          }}</span>
          <span v-else-if="request.status === 'rejected'  && request.updatedAt">Updated {{ formatDate(request.updatedAt)
          }}</span>
          <span v-else>Created {{ formatDate(request.createdAt) }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import { RecycleRequest } from '~~/server';
import { getStatusColor } from '@/components/utils';

export type Props = {
  request: RecycleRequest
}

const props = defineProps<Props>()

const formatDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
</script>