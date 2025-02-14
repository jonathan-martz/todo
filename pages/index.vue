<template>
    <section v-if="pb.authStore.isValid" class="page bg-blue-200 md:mx-auto max-w-6xl">
        <section class="flex justify-between items-center px-3 py-3">
            <div class="headline">
                <h2 class="font-bold">Todos</h2>
            </div>
            <section class="actions space-x-4">
                <a href="/categories" class="btn btn-primary btn-sm">
                    <Fa :icon="faList" size="2x" class="w-3" />
                </a>
                <a href="/add" class="btn btn-primary btn-sm">
                    <Fa :icon="faPlus" size="2x" class="w-3" />
                </a>
                <button @click="open = !open" class="btn btn-primary btn-sm">
                    <Fa :icon="faMagnifyingGlass" size="2x" class="w-3" />
                </button>
            </section>
        </section>
        <div class="overflow-x-auto hidden md:block">
            <section class="grid grid-cols-12 px-3">
                <div class="col-span-2 flex items-center">
                    <label for="query" class="text-sm font-bold">Suche</label>
                </div>
                <div class="col-span-10">
                    <input v-if="open" id="query" v-model="query" type="text" class="input w-full">
                </div>
            </section>
            <table v-if="sortedItems.length > 0" class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Prio</th>
                        <th>Kategorie</th>
                        <th>Name</th>
                        <th>Beschreibung</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(item, index) in sortedItems" class="bg-neutral" :key="item.id">
                        <td>
                            {{ item.prio }}
                        </td>
                        <td v-if="item.expand.category">
                            {{ item.expand.category.name }}
                        </td>
                        <td v-else>-</td>
                        <td>
                            {{ item.name }}
                        </td>
                        <td>
                            {{ item.description }}
                        </td>
                        <td class="flex justify-end space-x-3">
                            <button @click="edit(item.id)" class="btn btn-sm btn-primary text-white">
                                <Fa :icon="faEdit" class="w-3" />
                            </button>
                            <button @click="done(item.id)" class="btn btn-sm btn-primary text-white">
                                <Fa :icon="faCheck" class="w-3" />
                            </button>
                            <button @click="discarded(item.id)" class="btn btn-sm btn-primary text-white">
                                <Fa :icon="faTimes" class="w-3" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <p class="text-sm block text-center px-3 py-3 font-bold">Es gibt für dich noch keine Todos.</p>
            </div>
        </div>

        <div v-if="items.length > 0" class="overflow-x-auto block md:hidden px-3 py-3 lg:px-3 lg:py-0">
            <section v-if="open" class="grid grid-cols-12 px-3 mb-3">
                <div class="col-span-2 flex items-center">
                    <label for="query" class="text-sm font-bold">Suche</label>
                </div>
                <div class="col-span-10">
                    <input id="query" v-model="query" type="text" class="input w-full">
                </div>
            </section>
            <div class="grid grid-cols-6 gap-3">
                <div class="col-span-6" v-for="(item, index) in sortedItems" :key="item.id">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 v-if="item.expand && item.expand.category">{{ item.expand.category.name }}</h3>
                            <h2 class="card-title">{{ item.name }}</h2>
                            <p>{{ item.description }}</p>
                            <div class="card-actions justify-end">
                                <button @click="edit(item.id)" class="btn btn-sm btn-primary text-white">
                                    <Fa :icon="faEdit" class="w-3" />
                                </button>
                                <button @click="done(item.id)" class="btn btn-sm btn-primary text-white">
                                    <Fa :icon="faCheck" class="w-3" />
                                </button>
                                <button @click="discarded(item.id)" class="btn btn-sm btn-primary text-white">
                                    <Fa :icon="faTimes" class="w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        <div class="grid grid-cols-6">
            <div class="col-span-6 md:col-span-3">
                <div class="hero bg-base-200 py-12">
                    <div class="hero-content flex-col lg:flex-row">
                        <img src="/icon-192.png" class="max-w-sm rounded-full shadow-2xl" />
                        <div>
                            <h1 class="text-2xl font-bold text-accent-color block text-center md:text-left">Your Hero
                                Title</h1>
                            <p class="py-6 text-accent-color">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                                exercitationem quasi.
                                In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                            <a href="/login" class="btn btn-primary">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-6 md:col-span-3">
                <div class="hero bg-base-200 py-12">
                    <div class="hero-content flex-col lg:flex-row">
                        <img src="/icon-192.png" class="max-w-sm rounded-full shadow-2xl" />
                        <div>
                            <h1 class="text-2xl font-bold text-accent-color block text-center md:text-left">Your Hero
                                Title</h1>
                            <p class="py-6 text-accent-color">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                                exercitationem quasi.
                                In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                            <a href="/login" class="btn btn-primary">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { faCheck, faEdit, faList, faMagnifyingGlass, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

const pb = new PocketBase('https://admin.martz.cloud');

let items = ref([]);
const router = useRouter();
let open = ref(false);
let query = ref('');

watch(query, (value) => {
    load();
});

const sortedItems = computed(() => {
    return items.value
        .filter(item => !item.done)
        .filter(item => !item.discarded)
        .slice().sort((a, b) => b.prio - a.prio)
})

let remove = async (id) => {
    if (confirm('Willst du wirklich das Todo löschen mit der id(' + id + ')')) {
        await pb.collection('todos').delete(id);
    }
}

let discarded = async function (id) {
    await pb.collection('todos').update(id, {
        discarded: 'true'
    });
    load();
}

let done = async function (id) {
    await pb.collection('todos').update(id, {
        done: 'true'
    });
    load();
}

let edit = (id) => {
    router.push('/edit/' + id);
}

let load = async () => {
    if (query.value != '') {
        items.value = (await pb.collection('todos').getFullList(100, { filter: 'name~"%' + query.value + '%"', expand: 'category' }))
    }
    else {
        items.value = (await pb.collection('todos').getFullList(100, { expand: 'category' }))
    }
}

onMounted(async () => {
    load();

    pb.collection('todos').subscribe('*', function (e) {
        load();
    }, { /* other options like: filter, expand, custom headers, etc. */ });
});
</script>