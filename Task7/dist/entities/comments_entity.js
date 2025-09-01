var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
let Comment = class Comment {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Comment.prototype, "task_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Comment.prototype, "created_at", void 0);
__decorate([
    ManyToOne('Task', (task) => task.comments, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], Comment.prototype, "task", void 0);
Comment = __decorate([
    Entity('comments')
], Comment);
export { Comment };
