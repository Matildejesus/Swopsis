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
-- Data for Name: Clothing; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Clothing" (id, created_at, "itemId", subcategory, size, weight, fabric, condition, color) FROM stdin;
2	2025-07-24 02:46:46.968969+00	7	Shirt - Button Up Short	S	0.2	Wool	rarely-worn	#FFD700
\.


--
-- Name: Clothing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Clothing_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

