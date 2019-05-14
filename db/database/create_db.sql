DROP TABLE files_situation;
DROP TABLE files_session;
DROP TABLE content_composed_file;
DROP TABLE file;
DROP TABLE folder;
DROP TABLE character_sheet;
DROP TABLE session_arc;
DROP TABLE situation_tree;
DROP TABLE situation;
DROP TABLE scenario;
DROP TABLE story_arc;
DROP TABLE users;

CREATE TABLE users(
    id_user INTEGER NOT NULL AUTO_INCREMENT,
    pseudo_user VARCHAR(128) NOT NULL,
    password_user VARCHAR(128) NOT NULL,
    email_user VARCHAR(256) NOT NULL,
    email_user_verified TINYINT(1) DEFAULT 0,
    CONSTRAINT pk_users PRIMARY KEY (id_user),
    UNIQUE KEY unique_pseudo (pseudo_user),
    UNIQUE KEY unique_email (email_user)
);

CREATE TABLE story_arc(
    id_story_arc INTEGER NOT NULL AUTO_INCREMENT,
    title_story_arc VARCHAR(256),
    description_story_arc TEXT(65000),
    image_story_arc VARCHAR(1024),
    id_user INTEGER NOT NULL,
    CONSTRAINT pk_story_arc PRIMARY KEY (id_story_arc),
    CONSTRAINT fk_storyarc_users FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE scenario(
    id_scenario INTEGER NOT NULL AUTO_INCREMENT,
    num_scenario INTEGER,
    title_scenario VARCHAR(256),
    description_scenario TEXT(65000),
    image_scenario VARCHAR(1024),
    id_story_arc INTEGER NOT NULL,
    CONSTRAINT pk_scenario PRIMARY KEY (id_scenario),
    CONSTRAINT fk_scenario_storyarc FOREIGN KEY (id_story_arc) REFERENCES story_arc(id_story_arc) ON DELETE CASCADE
);

CREATE TABLE situation(
    id_situation INTEGER NOT NULL AUTO_INCREMENT,
    num_situation INTEGER,
    title_situation VARCHAR(256),
    text_situation TEXT(65000),
    id_scenario INTEGER NOT NULL,
    CONSTRAINT pk_situation PRIMARY KEY (id_situation),
    CONSTRAINT fk_situation_scenario FOREIGN KEY (id_scenario) REFERENCES scenario(id_scenario) ON DELETE CASCADE
);

CREATE TABLE situation_tree(
    id_parent_situation INTEGER NOT NULL,
    id_child_situation INTEGER NOT NULL,
    CONSTRAINT pk_situationtree PRIMARY KEY (id_parent_situation, id_child_situation),
    CONSTRAINT fk1_situationtree_situation FOREIGN KEY (id_parent_situation) REFERENCES situation(id_situation) ON DELETE CASCADE,
    CONSTRAINT fk2_situationtree_situation FOREIGN KEY (id_child_situation) REFERENCES situation(id_situation) ON DELETE CASCADE
);

CREATE TABLE session_arc(
    id_session INTEGER NOT NULL AUTO_INCREMENT,
    password_session VARCHAR(5),
    nbr_players_session INTEGER,
    status_session INTEGER,
    id_story_arc INTEGER NOT NULL,
    CONSTRAINT pk_session PRIMARY KEY (id_session),
    CONSTRAINT fk_session_storyarc FOREIGN KEY (id_story_arc) REFERENCES story_arc(id_story_arc)
);

CREATE TABLE character_sheet(
    id_user INTEGER NOT NULL,
    id_session INTEGER NOT NULL,
    CONSTRAINT pk_character_sheet PRIMARY KEY (id_user, id_session),
    CONSTRAINT fk_charactersheet_users FOREIGN KEY (id_user) REFERENCES users(id_user),
    CONSTRAINT fk_charactersheet_session FOREIGN KEY (id_session) REFERENCES session_arc(id_session) ON DELETE CASCADE
);

CREATE TABLE folder(
    id_folder INTEGER NOT NULL AUTO_INCREMENT,
    name_folder VARCHAR(128) NOT NULL,
    id_user INTEGER NOT NULL,
    id_parent_folder INTEGER NOT NULL,
    CONSTRAINT pk_folder PRIMARY KEY (id_folder),
    CONSTRAINT fk_folder_users FOREIGN KEY (id_user) REFERENCES users(id_user),
    CONSTRAINT fk_folder_folder FOREIGN KEY (id_parent_folder) REFERENCES folder(id_folder) ON DELETE CASCADE
);

CREATE TABLE file(
    id_file INTEGER NOT NULL AUTO_INCREMENT,
    media_type_file VARCHAR(32),
    name_file VARCHAR(128),
    path_file VARCHAR(1024),
    text_file TEXT(65000),
    id_folder INTEGER NOT NULL,
    CONSTRAINT pk_file PRIMARY KEY (id_file),
    CONSTRAINT fk_file_folder FOREIGN KEY (id_folder) REFERENCES folder(id_folder) ON DELETE CASCADE
);

CREATE TABLE content_composed_file(
    id_composed_file INTEGER NOT NULL,
    id_file INTEGER NOT NULL,
    CONSTRAINT pk_contentcomposedfile PRIMARY KEY (id_composed_file, id_file),
    CONSTRAINT fk1_contentcomposedfile_file FOREIGN KEY (id_composed_file) REFERENCES file(id_file) ON DELETE CASCADE,
    CONSTRAINT fk2_contentcomposedfile_file FOREIGN KEY (id_file) REFERENCES file(id_file) ON DELETE CASCADE
);

CREATE TABLE files_session(
    id_session INTEGER NOT NULL,
    id_file INTEGER NOT NULL,
    is_displayed TINYINT(1) DEFAULT 0,
    CONSTRAINT pk_filessession PRIMARY KEY (id_session, id_file),
    CONSTRAINT fk_filessession_session FOREIGN KEY (id_session) REFERENCES session_arc(id_session) ON DELETE CASCADE,
    CONSTRAINT fk_filessession_file FOREIGN KEY (id_file) REFERENCES file(id_file) ON DELETE CASCADE
);

CREATE TABLE files_situation(
    id_situation INTEGER NOT NULL,
    id_file INTEGER NOT NULL,
    is_displayed TINYINT(1) DEFAULT 0,
    CONSTRAINT pk_filessituation PRIMARY KEY (id_situation, id_file),
    CONSTRAINT fk_filessituation_situation FOREIGN KEY (id_situation) REFERENCES situation(id_situation) ON DELETE CASCADE,
    CONSTRAINT fk_filessituation_file FOREIGN KEY (id_file) REFERENCES file(id_file) ON DELETE CASCADE
);

