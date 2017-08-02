# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='price',
            field=models.IntegerField(null=True),
            preserve_default=True,
        ),
    ]
