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
-- Data for Name: Shoes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Shoes" (id, created_at, "itemId", subcategory, size, weight, fabric, shoelength, condition, color) FROM stdin;
5	2025-07-23 10:52:11.319724+00	6	Heels	7	0.8	polyester	short	rarely-worn	#FFC0CB
\.


--
-- Name: Shoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Shoes_id_seq"', 5, true);


--
-- PostgreSQL database dump complete
--

