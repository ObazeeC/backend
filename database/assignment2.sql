
-- query 1, insert into account table
INSERT INTO public.account(account_firstname,account_lastname,account_email,account_password)
VALUES('Tony','Stark','tony@starkent.com','Iam1ronM@n');

-- query 2: Modify the Tony Stark record to change the account_type to 'Admin'
UPDATE public.account
set account_type = 'Admin'
WHERE account_firstname = 'Tony';

-- query 3: Delete Tony Stark record from the database
DELETE FROM public.account
WHERE account_firstname = 'Tony'
AND  account_lastname ='Stark'; 

-- query 4 syntax REPLACE FUNCTION : REPLACE(source, from_text, to_text);
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id=10;

-- query 05 : Use inner join to select the MAKE and MODEL fields from inventory and classification
-- select only inventory items that belong to the "SPORT" category
SELECT i.inv_make, i.inv_model
FROM public.inventory i
INNER JOIN public.classification c
	on i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';


-- query 6: update all records in the inventory table to add /vehicles
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'), 
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');



	https://youtu.be/MYl_fCeUhvU
	