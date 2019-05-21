
-- Delete all subfolders and files if a folder is deleted
CREATE TRIGGER del_folder BEFORE DELETE ON folder 
FOR EACH ROW
BEGIN
	DELETE FROM folder
	WHERE id_parent_folder = :OLD.id_folder;

	DELETE FROM files
	WHERE id_folder = :OLD.id_folder;
END;


-- delete a file in a composed file IF and only if this file is anonymous (doesn't have a folder nor a name)
CREATE TRIGGER del_composed_file BEFORE DELETE ON file 
FOR EACH ROW
DECLARE
CURSOR c_components IS
    SELECT f.id_file, id_folder
    FROM file f, content_composed_file ccf
    WHERE f.idfile = ccf.id_file AND ccf.id_composed_file = :OLD.id_file;
BEGIN
	IF :OLD.media_type_file = 'composed' THEN

		FOR file IN c_components LOOP
			IF file.id_folder = NULL THEN
				DELETE FROM files
				WHERE id_file = file.id_file;
			END IF;
		END LOOP;

	END IF;
END;
