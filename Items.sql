--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Items" (id, created_at, "userId", category, image, title, description, method, available, "tradeCount", "unavailableDates") FROM stdin;
6	2025-07-23 10:52:11.202098+00	ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	Shoes	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/0FD74DB1-265E-4C25-A9F0-EB8CE573D713.jpg	YSL Heels	sleek, red and pretty	swap	t	0	\N
7	2025-07-24 02:46:46.861519+00	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	Clothing	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/9967797B-7299-43B4-AAA6-5C40FB087D65.jpg	Red Blouse	tight fitting, perfect for an event	loan	t	0	{"2025-07-23": {"marked": true, "dotColor": "red", "selected": true}, "2025-07-25": {"marked": true, "dotColor": "red", "selected": true}, "2025-07-28": {"marked": true, "dotColor": "red", "selected": true}}
\.


--
-- Name: Items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Items_id_seq"', 7, true);


--
-- PostgreSQL database dump complete
--

