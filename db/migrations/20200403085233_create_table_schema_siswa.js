exports.up = function(knex) {
    return knex.schema
        .createTable('siswa.siswa', function(table){
            table.increments('kd_siswa')
            table.integer('user_id').unsigned()
            table.integer('kategori_kelas_id').unsigned()
            table.integer('kelas_id').unsigned()
            table.integer('school_id').unsigned()
            table.foreign('user_id').references('id_user').inTable('pengguna.users').onUpdate('cascade').onDelete('cascade')
            table.foreign('kategori_kelas_id').references('id_kategori_kelas').inTable('guru.kategori_kelas').onUpdate('cascade').onDelete('cascade')
            table.foreign('kelas_id').references('id_kelas').inTable('guru.kelas').onUpdate('cascade').onDelete('cascade')
            table.foreign('school_id').references('id_school').inTable('support.schools').onUpdate('cascade').onDelete('cascade')
        })
        .createTable('siswa.guru_favorite', function(table){
            table.increments('id_guru_favorite')
            table.integer('guru_kd').unsigned()
            table.integer('siswa_kd').unsigned()
            table.foreign('guru_kd').references('kd_guru').inTable('guru.guru').onUpdate('cascade').onDelete('cascade')
            table.foreign('siswa_kd').references('kd_siswa').inTable('siswa.siswa').onUpdate('cascade').onDelete('cascade')
        })
        .createTable('siswa.history', function(table){
            table.uuid('id_history').primary('id_history')
            table.string('tanggal_history', 50)
            table.string('status_history', 20)
            table.string('jadwal_history', 20)
            table.integer('guru_kd').unsigned()
            table.integer('siswa_kd').unsigned()
            table.foreign('guru_kd').references('kd_guru').inTable('guru.guru').onUpdate('cascade').onDelete('cascade')
            table.foreign('siswa_kd').references('kd_siswa').inTable('siswa.siswa').onUpdate('cascade').onDelete('cascade')
            table.text('keterangan_history')
        })
        .createTable('siswa.ratings', function(table){
            table.increments('id_rating')
            table.integer('nilai_rating')
            table.integer('guru_kd').unsigned()
            table.integer('siswa_kd').unsigned()
            table.uuid('history_id')
            table.foreign('guru_kd').references('kd_guru').inTable('guru.guru').onUpdate('cascade').onDelete('cascade')
            table.foreign('siswa_kd').references('kd_siswa').inTable('siswa.siswa').onUpdate('cascade').onDelete('cascade')
            table.foreign('history_id').references('id_history').inTable('siswa.history').onUpdate('cascade').onDelete('cascade')
            table.string('komentar', 100)
            table.string('tanggal_komentar', 20)
        })
        .createTable('siswa.materi_guru', function(table){
            table.increments('id_materi_guru')
            table.string('nama_materi', 100)
            table.string('file_materi')
            table.string('tanggal_upload', 20)
            table.integer('guru_kd').unsigned()
            table.integer('siswa_kd').unsigned()
            table.foreign('guru_kd').references('kd_guru').inTable('guru.guru').onUpdate('cascade').onDelete('cascade')
            table.foreign('siswa_kd').references('kd_siswa').inTable('siswa.siswa').onUpdate('cascade').onDelete('cascade')
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('siswa.materi_guru')
    .dropTable('siswa.ratings')
    .dropTable('siswa.history')
    .dropTable('siswa.guru_favorite')
    .dropTable('siswa.siswa')
};
