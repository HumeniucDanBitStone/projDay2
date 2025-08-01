import dbConn from '../../repo/dbConn.js';
import DbMigration from "../logic/DbMigration.js";

const migration: DbMigration = {
    up() {
        return dbConn.promise().query(
            `
                create table credentials
                (
                    email    varchar(255)      not null,
                    id       bigint auto_increment
                        primary key,
                    password varchar(255)      not null,
                    role     tinyint default 1 not null,
                    constraint unique_email
                        unique (email)
                );

                create table permissions
                (
                    id          bigint       not null
                        primary key,
                    description varchar(255) not null
                );

                create table roles
                (
                    id          bigint       not null
                        primary key,
                    name        varchar(63)  not null,
                    description varchar(255) null
                );

                create table roles_permissions
                (
                    role_id       bigint not null,
                    permission_id bigint not null,
                    primary key (role_id, permission_id),
                    constraint roles_permissions_ibfk_1
                        foreign key (role_id) references roles (id)
                            on delete cascade,
                    constraint roles_permissions_ibfk_2
                        foreign key (permission_id) references permissions (id)
                            on delete cascade
                );

                create index permission_id
                    on roles_permissions (permission_id);

                create table users
                (
                    id    bigint auto_increment
                        primary key,
                    name  varchar(255) null,
                    email varchar(255) not null,
                    constraint email
                        unique (email)
                );
            `
        )
    },
    down() {
        throw new Error('No down migration available');
    }
}

export default migration
