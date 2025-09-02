export class InitialMigration1756452740528 {
    constructor() {
        this.name = 'InitialMigration1756452740528';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "profession" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "comments" ("id" SERIAL NOT NULL, "task_id" integer NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "taskId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TYPE "public"."tasks_status_enum" AS ENUM(\'todo\', \'in_progress\', \'done\')');
        await queryRunner.query('CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "status" "public"."tasks_status_enum" NOT NULL, "due_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, "assignedToId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "tasks" ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "tasks" ADD CONSTRAINT "FK_d020677feafe94eba0cb9d846d1" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "tasks" DROP CONSTRAINT "FK_d020677feafe94eba0cb9d846d1"');
        await queryRunner.query('ALTER TABLE "tasks" DROP CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956"');
        await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"');
        await queryRunner.query('DROP TABLE "tasks"');
        await queryRunner.query('DROP TYPE "public"."tasks_status_enum"');
        await queryRunner.query('DROP TABLE "comments"');
        await queryRunner.query('DROP TABLE "projects"');
        await queryRunner.query('DROP TABLE "users"');
    }
}
