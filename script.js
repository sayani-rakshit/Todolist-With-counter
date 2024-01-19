
    function addTodo() {
      const taskInput = document.getElementById("taskInput");
      const dateTimeInput = document.getElementById("dateTimeInput");

      const task = taskInput.value;
      const dateTimeString = dateTimeInput.value;

      if (task && dateTimeString) {
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";

        const taskLabel = document.createElement("span");
        taskLabel.textContent = `Task: ${task}`;
        todoItem.appendChild(taskLabel);

        const dateTimeLabel = document.createElement("span");
        dateTimeLabel.textContent = `Date and Time: ${dateTimeString}`;
        todoItem.appendChild(dateTimeLabel);

        const countdownLabel = document.createElement("span");
        countdownLabel.textContent = "Countdown: ...";
        todoItem.appendChild(countdownLabel);

        const startButton = document.createElement("button");
        startButton.textContent = "Start Countdown";
        startButton.addEventListener("click", () => startCountdown(dateTimeString, countdownLabel));
        todoItem.appendChild(startButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => removeTodoItem(todoItem));
        todoItem.appendChild(deleteButton);

        document.getElementById("todo-list").appendChild(todoItem);

        taskInput.value = '';
        dateTimeInput.value = '';
      } else {
        alert("Task or date/time cannot be empty.");
      }
    }

    function startCountdown(dateTimeString, countdownLabel) {
      const dateTime = new Date(dateTimeString);
      const now = new Date();

      const timeDifference = dateTime.getTime() - now.getTime();

      if (timeDifference > 0) {
        const countdownId = setInterval(() => {
          const timeDifference = dateTime.getTime() - new Date().getTime();
          if (timeDifference <= 0) {
            clearInterval(countdownId);
            countdownLabel.textContent = "Countdown: Expired";
          } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownLabel.textContent =` Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
          }
        }, 1000);
      } else {
        alert("Invalid date and time. Please enter a future date and time.");
      }
    }



    function removeTodoItem(todoItem) {
      todoItem.remove();
    }