# Generated by Django 5.0.4 on 2024-05-28 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_music_spotify_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trackrating',
            name='rating',
            field=models.FloatField(),
        ),
    ]
