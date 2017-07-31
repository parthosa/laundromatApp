# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20170729_0334'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='dp',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='dp_url',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='plan',
            field=models.ForeignKey(related_name=b'stu_plan', blank=True, to='main.Plan', null=True),
        ),
    ]
