# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_userprofile_bag_num'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='num_washes',
            field=models.IntegerField(null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='total_washes',
            field=models.IntegerField(null=True),
            preserve_default=True,
        ),
    ]
