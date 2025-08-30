from analise_de_dados import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)