import React, { useEffect, useState } from "react";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Paginate } from "@/components/layouts/Paginate";
import { AddTask} from "@/components/tasks/AddTask";
import { TaskList } from "@/components/tasks/TaskList";
import { StatusAndFilter } from "@/components/common/StatusAndFilter";
import { DateTimeFilter } from "@/components/common/DateTimeFilter";
import api from "@/lib/axios";
import { toast } from "sonner";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [dateQuery, setDateQuery] = useState("today");
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />
          <AddTask handleNewTaskAdded={handleTaskChanged} />
          <StatusAndFilter
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
            filter={filter}
            setFilter={setFilter}
          />
          <TaskList
            filteredTasks={filteredTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />
          <Paginate
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
          <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          <Footer
            completedTasksCount={completeTaskCount}
            activeTasksCount={activeTaskCount}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage