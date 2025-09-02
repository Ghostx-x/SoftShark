var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "todo";
    TaskStatus["IN_PROGRESS"] = "in_progress";
    TaskStatus["DONE"] = "done";
})(TaskStatus || (TaskStatus = {}));
let Task = class Task {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    Column({ type: 'enum', enum: TaskStatus }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "due_date", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Task.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Task.prototype, "updated_at", void 0);
__decorate([
    OneToMany('Comment', (comment) => comment.task),
    __metadata("design:type", Array)
], Task.prototype, "comments", void 0);
__decorate([
    ManyToOne('Project', (project) => project.tasks, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], Task.prototype, "project", void 0);
__decorate([
    ManyToOne('User', (user) => user.tasks, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "assigned_to", void 0);
Task = __decorate([
    Entity('tasks')
], Task);
export { Task };
