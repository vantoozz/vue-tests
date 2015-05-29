import Vue from "vue";

new Vue({
    el: '#tasks',

    data: {
        tasks: [],
        newTask: ''
    },

    filters: {
        inProcess: tasks => {
            return tasks.filter(task => {
                return !task.completed;
            });
        }
    },

    computed: {
        completions: function () {
            return this.tasks.filter(task => {
                return task.completed;
            });
        },
        remaining: function () {
            return this.tasks.filter(task => {
                return !task.completed;
            });
        }
    },

    methods: {
        addTask: function (e) {
            e && e.preventDefault();

            if (!this.newTask) {
                return;
            }
            this.tasks.push({
                body: this.newTask,
                completed: false
            });
            this.newTask = '';
        },

        removeTask: function (task) {
            this.tasks.$remove(task);
        },

        toggleCompleteStatus: task => {
            task.completed = !task.completed;
        },

        completeAll: function (e) {
            e && e.preventDefault();

            this.tasks.forEach(task => {
                task.completed = true;
            });
            this.$$.newTask.focus();
        },

        editTask: function (task) {
            this.addTask();
            this.removeTask(task);
            this.newTask = task.body;
            this.$$.newTask.focus();
        },

        removeCompleted: function () {
            this.tasks = this.tasks.filter(task => {
                return !task.completed;
            });
        }
    }
});