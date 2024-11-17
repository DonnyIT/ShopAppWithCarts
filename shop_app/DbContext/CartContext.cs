﻿using Microsoft.EntityFrameworkCore; // Импортирует пространство имен для работы с Entity Framework Core
using shop_app.Models; // Импортирует пространство имен, где находятся модели приложения

// Контекст базы данных для продуктов, наследующий от DbContext
public class CartContext : DbContext
{
    // Конструктор принимает параметры конфигурации контекста базы данных
    public CartContext(DbContextOptions<CartContext> options)
        : base(options) // Передает параметры в базовый класс DbContext
    {
        // Базовый класс DbContext настроит соединение с базой данных и определит таблицы
    }

    // Свойство для доступа к таблице продуктов в базе данных
    public DbSet<Cart> Carts { get; set; }
}