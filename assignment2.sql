
-- Task one, insert into account table
INSERT INTO public.account(account_firstname,account_lastname,account_email,account_password)
VALUES('Tony','Stark','tony@starkent.com','Iam1ronM@n');

-- task 2: Modify the Tony Stark record to change the account_type to 'Admin'
UPDATE public.account
set account_type = 'Admin'
WHERE account_firstname = 'Tony';

-- task 3: Delete Tony Stark record from the database
DELETE FROM public.account
WHERE account_firstname = 'Tony'
AND  account_lastname ='Stark'; 

