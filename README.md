# Pizza Ordering App - backend (PERN Stack)

## Overview

This is the backend of the Pizza Ordering App, built with Node.js and Express. It provides a RESTful API to manage users, restaurants, pizzas, and orders. The backend uses **PostgreSQL** for data
storage and **CASL** for implementing role-based access control (RBAC).

## Features

-   **User Management**: Allows user registration, authentication, and role-based access control.
-   **Restaurant Management**: Allows restaurant owners to manage their restaurants and menus.
-   **Order Management**: Handles pizza orders, including customization and order status updates.
-   **Role-Based Access Control (RBAC)**: Dynamically created user roles are managed using **CASL** to restrict access to resources based on user permissions.
-   **Data Validation**: Input is validated using **Zod** to ensure data integrity.

## Technologies

-   **Node.js**: JavaScript runtime for building the server-side application.
-   **Express**: Web framework for handling API requests.
-   **PostgreSQL**: Relational database for storing application data.
-   **Zod**: For validating API inputs.
-   **CASL**: For implementing RBAC authorization.

## Getting Started

### Prerequisites

-   **Node.js**: Make sure Node.js is installed on your system.
-   **PostgreSQL**: Install PostgreSQL and create a database for the app.

### Installation

1. Clone the repository:
    ```bash
    git clone git@github.com:YerosenHunduma/pizza_ordring_app.git
    cd pizza_ordering_app
    ```
