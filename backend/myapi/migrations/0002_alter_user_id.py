# Generated by Django 5.0.2 on 2024-04-23 09:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("myapi", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="id",
            field=models.AutoField(db_column="ID", primary_key=True, serialize=False),
        ),
    ]
