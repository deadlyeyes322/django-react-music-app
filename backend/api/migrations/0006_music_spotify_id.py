# Generated by Django 5.0.4 on 2024-05-28 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_trackrating_delete_usermusicvotes'),
    ]

    operations = [
        migrations.AddField(
            model_name='music',
            name='spotify_id',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
