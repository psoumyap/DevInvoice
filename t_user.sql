

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";



-- --------------------------------------------------------

--
-- Table structure for table `t_user`
--

CREATE TABLE t_user (
  user_ID int(11) NOT NULL AUTO_INCREMENT,
  Name varchar(255) NOT NULL,
  email varchar(255),
  duedate DATE,
  PRIMARY KEY (user_ID)
);


CREATE TABLE t_lineitems (
user_ID int(11),
line_ID int(11) NOT NULL AUTO_INCREMENT,
description varchar(255) not null,
amount int(10) NOT NULL,
PRIMARY KEY (line_ID),
FOREIGN KEY (user_ID) REFERENCES t_user(user_ID)
);

create TYPE line_item_type (
amount float(11) NOT NULL,
description varchar(255) not null
);

--
-- Inserting into t_user and t_lineitems
--

INSERT INTO t_user (`user_id`, `name`, `email`, `duedate`) VALUES
(1, 'Mas Banyar', 'banyar@yahoo.com', '07-10-15'),
(2, 'Mas Mapmup', 'mapmup@gmail.com', '07-10-15'),
(4, 'Boronong', 'borononn@yahoo.com', '07-10-15'),
(5, 'Nadya Ek', 'nadya@yahoo.com', '07-10-15');

INSERT INTO t_lineitems (`description`, `amount`) VALUES
('Invoice1', 30),
('Invoice2', 60);



