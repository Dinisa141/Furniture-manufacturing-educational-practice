--
-- PostgreSQL database dump
--

\restrict zToJkSiwcy27nxfBUKgFpJ64WAzgHSxqvxlPCBWFkQzHLOfL2rnIuQS0o4S3XvM

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-10 09:17:59

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
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16880)
-- Name: material_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.material_types (
    id integer NOT NULL,
    material_name character varying(100) NOT NULL,
    loss_percentage numeric(5,2) NOT NULL
);


ALTER TABLE public.material_types OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16879)
-- Name: material_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.material_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.material_types_id_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 221
-- Name: material_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.material_types_id_seq OWNED BY public.material_types.id;


--
-- TOC entry 220 (class 1259 OID 16868)
-- Name: product_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_types (
    id integer NOT NULL,
    type_name character varying(100) NOT NULL,
    type_factor numeric(5,2) NOT NULL
);


ALTER TABLE public.product_types OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16867)
-- Name: product_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_types_id_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 219
-- Name: product_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_types_id_seq OWNED BY public.product_types.id;


--
-- TOC entry 228 (class 1259 OID 16927)
-- Name: product_workshops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_workshops (
    id integer NOT NULL,
    product_id integer,
    workshop_id integer,
    production_time numeric(5,2) NOT NULL
);


ALTER TABLE public.product_workshops OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16926)
-- Name: product_workshops_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_workshops_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_workshops_id_seq OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 227
-- Name: product_workshops_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_workshops_id_seq OWNED BY public.product_workshops.id;


--
-- TOC entry 226 (class 1259 OID 16905)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    product_type_id integer,
    product_name character varying(300) NOT NULL,
    article character varying(50),
    minimum_cost numeric(12,2) NOT NULL,
    main_material_id integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16904)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 224 (class 1259 OID 16892)
-- Name: workshops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workshops (
    id integer NOT NULL,
    workshop_name character varying(200) NOT NULL,
    workshop_type character varying(100) NOT NULL,
    number_of_people integer NOT NULL
);


ALTER TABLE public.workshops OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16891)
-- Name: workshops_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workshops_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.workshops_id_seq OWNER TO postgres;

--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 223
-- Name: workshops_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workshops_id_seq OWNED BY public.workshops.id;


--
-- TOC entry 4877 (class 2604 OID 16883)
-- Name: material_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_types ALTER COLUMN id SET DEFAULT nextval('public.material_types_id_seq'::regclass);


--
-- TOC entry 4876 (class 2604 OID 16871)
-- Name: product_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_types ALTER COLUMN id SET DEFAULT nextval('public.product_types_id_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 16930)
-- Name: product_workshops id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_workshops ALTER COLUMN id SET DEFAULT nextval('public.product_workshops_id_seq'::regclass);


--
-- TOC entry 4879 (class 2604 OID 16908)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 16895)
-- Name: workshops id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workshops ALTER COLUMN id SET DEFAULT nextval('public.workshops_id_seq'::regclass);


--
-- TOC entry 5055 (class 0 OID 16880)
-- Dependencies: 222
-- Data for Name: material_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.material_types (id, material_name, loss_percentage) FROM stdin;
1	Мебельный щит из массива дерева	0.80
2	Ламинированное ДСП	0.70
3	Фанера	0.55
4	МДФ	0.30
\.


--
-- TOC entry 5053 (class 0 OID 16868)
-- Dependencies: 220
-- Data for Name: product_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_types (id, type_name, type_factor) FROM stdin;
1	Гостиные	3.50
2	Прихожие	5.60
3	Мягкая мебель	3.00
4	Кровати	4.70
5	Шкафы	1.50
6	Комоды	2.30
\.


--
-- TOC entry 5061 (class 0 OID 16927)
-- Dependencies: 228
-- Data for Name: product_workshops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_workshops (id, product_id, workshop_id, production_time) FROM stdin;
1	10	8	2.00
2	10	10	0.50
3	10	4	0.60
4	10	6	0.40
5	10	3	1.00
6	10	12	0.50
7	20	8	2.70
8	20	10	1.00
9	20	4	0.50
10	20	6	0.50
11	20	1	1.00
12	20	3	0.60
13	20	2	0.40
14	20	11	1.00
15	20	12	0.30
16	6	9	4.20
17	6	4	0.50
18	6	6	0.50
19	6	3	1.00
20	6	11	0.50
21	6	5	2.00
22	6	12	0.30
23	7	9	4.50
24	7	4	0.50
25	7	6	1.00
26	7	3	1.00
27	7	11	0.30
28	7	5	2.00
29	7	7	0.50
30	7	12	0.20
31	8	9	4.70
32	8	4	0.50
33	8	6	0.50
34	8	1	0.50
35	8	3	0.50
36	8	2	0.50
37	8	7	0.50
38	8	12	0.30
39	9	9	4.00
40	9	4	0.30
41	9	6	0.50
42	9	3	0.70
43	9	7	1.00
44	9	12	0.50
45	11	9	5.50
46	11	4	1.00
47	11	3	1.00
48	11	12	0.50
49	2	10	0.30
50	2	4	0.30
51	2	6	0.40
52	2	1	1.00
53	2	3	1.00
54	2	2	1.00
55	2	11	1.00
56	2	7	1.00
57	2	5	2.00
58	3	10	0.50
59	3	4	0.50
60	3	3	1.00
61	3	11	1.00
62	5	10	0.30
63	5	4	0.50
64	5	6	0.50
65	5	1	1.50
66	5	3	1.00
67	5	2	0.50
68	5	11	0.50
69	5	7	1.00
70	5	5	2.00
71	5	12	0.20
72	13	10	0.50
73	13	4	0.50
74	13	1	2.00
75	13	3	1.00
76	13	2	1.00
77	13	11	1.50
78	13	12	0.50
79	1	4	0.50
80	1	6	0.30
81	1	1	1.00
82	1	3	1.00
83	1	2	0.40
84	1	7	1.50
85	1	5	2.00
86	1	12	0.30
87	4	4	0.50
88	4	3	1.00
89	4	12	0.50
90	12	4	0.80
91	12	3	1.10
92	12	11	0.80
93	12	12	0.30
94	14	4	2.00
95	14	6	1.50
96	14	3	2.00
97	14	11	0.30
98	14	12	0.20
99	15	4	0.30
100	15	6	1.00
101	15	1	1.00
102	15	3	1.00
103	15	2	0.70
104	15	11	0.30
105	15	7	0.50
106	15	5	2.00
107	15	12	0.20
108	16	4	1.50
109	16	3	1.00
110	16	11	2.00
111	16	7	1.00
112	16	12	0.50
113	17	4	1.00
114	17	6	2.50
115	17	3	1.00
116	17	7	3.00
117	17	12	0.50
118	18	4	0.50
119	18	6	1.00
120	18	3	1.00
121	18	11	0.30
122	18	7	2.00
123	18	5	2.00
124	18	12	0.20
125	19	4	0.40
126	19	6	0.40
127	19	3	1.00
128	19	7	2.00
129	19	5	2.00
130	19	12	0.20
\.


--
-- TOC entry 5059 (class 0 OID 16905)
-- Dependencies: 226
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, product_type_id, product_name, article, minimum_cost, main_material_id) FROM stdin;
1	1	Комплект мебели для гостиной Ольха горная	1549922	160507.00	1
2	1	Стенка для гостиной Вишня темная	1018556	216907.00	1
3	2	Прихожая Венге Винтаж	3028272	24970.00	2
4	2	Тумба с вешалкой Дуб натуральный	3029272	18206.00	2
5	2	Прихожая-комплект Дуб темный	3028248	177509.00	1
6	3	Диван-кровать угловой Книжка	7118827	85900.00	1
7	3	Диван модульный Телескоп	7137981	75900.00	1
8	3	Диван-кровать Соло	7029787	120345.00	1
9	3	Детский диван Выкатной	7758953	25990.00	3
10	4	Кровать с подъемным механизмом с матрасом 1600х2000 Венге	6026662	69500.00	1
11	4	Кровать с матрасом 90х2000 Венге	6159043	55600.00	2
12	4	Кровать универсальная Дуб натуральный	6588376	37900.00	2
13	4	Кровать с ящиками Ясень белый	6758375	46750.00	3
14	5	Шкаф-купе 3-х дверный Сосна белая	2759324	131560.00	2
15	5	Стеллаж Бук натуральный	2118827	38700.00	1
16	5	Шкаф 4 дверный с ящиками Ясень серый	2559898	160151.00	3
17	5	Шкаф-пенал Береза белый	2259474	40500.00	3
18	6	Комод 6 ящиков Вишня светлая	4115947	61235.00	1
19	6	Комод 4 ящика Вишня светлая	4033136	41200.00	1
20	6	Тумба под ТВ	4028048	12350.00	4
\.


--
-- TOC entry 5057 (class 0 OID 16892)
-- Dependencies: 224
-- Data for Name: workshops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workshops (id, workshop_name, workshop_type, number_of_people) FROM stdin;
1	Проектный	Проектирование	4
2	Расчетный	Проектирование	5
3	Раскроя	Обработка	5
4	Обработки	Обработка	6
5	Сушильный	Сушка	3
6	Покраски	Обработка	5
7	Столярный	Обработка	7
8	Изготовления изделий из искусственного камня и композитных материалов	Обработка	3
9	Изготовления мягкой мебели	Обработка	5
10	Монтажа стеклянных, зеркальных вставок и других изделий	Сборка	2
11	Сборки	Сборка	6
12	Упаковки	Сборка	4
\.


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 221
-- Name: material_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.material_types_id_seq', 4, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 219
-- Name: product_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_types_id_seq', 6, true);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 227
-- Name: product_workshops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_workshops_id_seq', 130, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 20, true);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 223
-- Name: workshops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workshops_id_seq', 12, true);


--
-- TOC entry 4886 (class 2606 OID 16890)
-- Name: material_types material_types_material_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_types
    ADD CONSTRAINT material_types_material_name_key UNIQUE (material_name);


--
-- TOC entry 4888 (class 2606 OID 16888)
-- Name: material_types material_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_types
    ADD CONSTRAINT material_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4882 (class 2606 OID 16876)
-- Name: product_types product_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4884 (class 2606 OID 16878)
-- Name: product_types product_types_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_types_type_name_key UNIQUE (type_name);


--
-- TOC entry 4898 (class 2606 OID 16934)
-- Name: product_workshops product_workshops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_workshops
    ADD CONSTRAINT product_workshops_pkey PRIMARY KEY (id);


--
-- TOC entry 4900 (class 2606 OID 16936)
-- Name: product_workshops product_workshops_product_id_workshop_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_workshops
    ADD CONSTRAINT product_workshops_product_id_workshop_id_key UNIQUE (product_id, workshop_id);


--
-- TOC entry 4894 (class 2606 OID 16915)
-- Name: products products_article_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_article_key UNIQUE (article);


--
-- TOC entry 4896 (class 2606 OID 16913)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4890 (class 2606 OID 16901)
-- Name: workshops workshops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workshops
    ADD CONSTRAINT workshops_pkey PRIMARY KEY (id);


--
-- TOC entry 4892 (class 2606 OID 16903)
-- Name: workshops workshops_workshop_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workshops
    ADD CONSTRAINT workshops_workshop_name_key UNIQUE (workshop_name);


--
-- TOC entry 4903 (class 2606 OID 16937)
-- Name: product_workshops product_workshops_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_workshops
    ADD CONSTRAINT product_workshops_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4904 (class 2606 OID 16942)
-- Name: product_workshops product_workshops_workshop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_workshops
    ADD CONSTRAINT product_workshops_workshop_id_fkey FOREIGN KEY (workshop_id) REFERENCES public.workshops(id) ON DELETE CASCADE;


--
-- TOC entry 4901 (class 2606 OID 16921)
-- Name: products products_main_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_main_material_id_fkey FOREIGN KEY (main_material_id) REFERENCES public.material_types(id);


--
-- TOC entry 4902 (class 2606 OID 16916)
-- Name: products products_product_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.product_types(id);


-- Completed on 2025-12-10 09:17:59

--
-- PostgreSQL database dump complete
--

\unrestrict zToJkSiwcy27nxfBUKgFpJ64WAzgHSxqvxlPCBWFkQzHLOfL2rnIuQS0o4S3XvM

