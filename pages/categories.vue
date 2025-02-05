<template>
    <section class="page bg-blue-200 md:mx-auto max-w-6xl">
        <section class="flex justify-between items-center px-3 py-3">
            <div class="headline">
                <h2 class="font-bold">Todos</h2>
            </div>
            <section class="actions space-x-4">
            </section>
        </section>
        <div v-if="sortedItems.length > 0" class="overflow-x-auto hidden md:block">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(item, index) in sortedItems" class="bg-neutral" :key="item.id">
                        <td>
                            <a :href="'/category/' + item.id" class="text-[#1f6fed] font-bold">
                                {{ item.name }}
                            </a>
                        </td>
                        <td>
                            {{ item.slug }}
                        </td>
                        <td class="flex">
                            <a :href="'/add?category=' + item.id" class="btn btn-primary btn-sm">
                                <Fa :icon="faPlus" size="2x" class="w-3" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p class="text-sm block text-center px-3 py-3 font-bold">Es gibt für dich noch keine Todos.</p>
        </div>

        <div v-if="sortedItems.length > 0" class="overflow-x-auto block md:hidden px-3 py-3 lg:px-3 lg:py-0">
            <div class="grid grid-cols-6 gap-3">
                <div class="col-span-6" v-for="(item, index) in sortedItems" :key="item.id">
                    <div class="card bg-base-100 shadow-xl px-3 py-3">
                        <div class="card-title flex justify-between">
                            <h3>{{ item.name }}</h3>
                            <section class="actions flex">
                                <a :href="'/category/' + item.id" class="btn btn-primary btn-sm">
                                    <Fa :icon="faEye" size="2x" class="w-3" />
                                </a>
                                <a :href="'/add?category=' + item.id" class="btn btn-primary btn-sm">
                                    <Fa :icon="faPlus" size="2x" class="w-3" />
                                </a>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

const pb = new PocketBase('https://admin.todos.martz.cloud');

let items = ref([]);
const router = useRouter();

const sortedItems = computed(() => {
    return items.value;
})

let load = async () => {
    items.value = (await pb.collection('todos_categories').getFullList(100))
}

onMounted(async () => {
    load();
});
</script>