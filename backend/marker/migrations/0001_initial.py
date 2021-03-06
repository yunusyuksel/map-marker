# Generated by Django 3.2.6 on 2021-08-05 20:42

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('latitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('longitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('name', models.CharField(max_length=255)),
                ('photo', models.ImageField(upload_to='places')),
            ],
        ),
    ]
