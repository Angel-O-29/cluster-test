<script setup lang="ts">
import { PlayIcon } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="
      cn(
        'tw-touch-manipulation tw-absolute tw-rounded-full tw-p-0 tw-z-40 tw-border-none',
        orientation === 'horizontal'
          ? 'tw-right-12 tw-top-1/2 -tw-translate-y-1/2'
          : 'tw-bottom-12 tw-left-1/2 -tw-translate-x-1/2 rotate-90',
        props.class,
      )
    "
    variant="outline"
    @click="scrollNext"
  >
    <slot>
      <PlayIcon class="h-4 w-4 text-current" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
